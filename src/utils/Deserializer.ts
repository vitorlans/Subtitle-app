import * as sax from 'sax';
import dateFormatter from './DateFormatter'


export default class Deserializer {
  type: any
  responseType: any
  stack: any
  marks: any
  data: any
  methodname: any
  encoding: any
  value: any
  callback: any
  error: any
  parser: any

  constructor(encoding?: any) {
    this.type = null
    this.responseType = null
    this.stack = []
    this.marks = []
    this.data = []
    this.methodname = null
    this.encoding = encoding || 'utf8'
    this.value = false
    this.callback = null
    this.error = null

    this.parser = sax.parser(false, null);
    this.parser.onopentag = this.onOpentag.bind(this)
    this.parser.onclosetag = this.onClosetag.bind(this)
    this.parser.ontext = this.onText.bind(this)
    this.parser.oncdata = this.onCDATA.bind(this)
    this.parser.onend = this.onDone.bind(this)
    this.parser.onerror = this.onError.bind(this)
  }

  deserializeMethodResponse = function (stream: any, callback: any) {
    var that = this;

    this.callback = function (error: any, result: any) {
      if (error) {
        callback(error)
      }
      else if (result.length > 1) {
        callback(new Error('Response has more than one param'))
      }
      else if (that.type !== 'methodresponse') {
        callback(new Error('Not a method response'))
      }
      else if (!that.responseType) {
        callback(new Error('Invalid method response'))
      }
      else {
        callback(null, result[0])
      }
    }

    this.parser.write(stream).close();

  }


  onDone = function () {
    var that = this

    if (!this.error) {
      if (this.type === null || this.marks.length) {
        this.callback(new Error('Invalid XML-RPC message'))
      }
      else if (this.responseType === 'fault') {
        var createFault = function (fault: any) {
          var error = new Error('XML-RPC fault' + (fault.faultString ? ': ' + fault.faultString : '')) as any
          error.code = fault.faultCode
          error.faultCode = fault.faultCode
          error.faultString = fault.faultString
          return error
        }
        this.callback(createFault(this.stack[0]))
      }
      else {
        this.callback(undefined, this.stack)
      }
    }
  }

  // TODO:
  // Error handling needs a little thinking. There are two different kinds of
  // errors: 
  //   1. Low level errors like network, stream or xml errors. These don't
  //      require special treatment. They only need to be forwarded. The IO
  //      is already stopped in these cases. 
  //   2. Protocol errors: Invalid tags, invalid values &c. These happen in
  //      our code and we should tear down the IO and stop parsing.
  // Currently all errors end here. Guess I'll split it up. 
  onError = function (msg: any) {
    if (!this.error) {
      if (typeof msg === 'string') {
        this.error = new Error(msg)
      }
      else {
        this.error = msg
      }
      this.callback(this.error)
    }
  }

  push = function (value: any) {
    this.stack.push(value)
  }

  //==============================================================================
  // SAX Handlers
  //==============================================================================

  onOpentag = function (node: any) {
    if (node.name === 'ARRAY' || node.name === 'STRUCT') {
      this.marks.push(this.stack.length)
    }
    this.data = []
    this.value = (node.name === 'VALUE')
  }

  onText = function (text: any) {
    this.data.push(text)
  }

  onCDATA = function (cdata: any) {
    this.data.push(cdata)
  }

  onClosetag = function (el: any) {

    var data = this.data.join('')
    try {
      switch (el) {
        case 'BOOLEAN':
          this.endBoolean(data)
          break
        case 'INT':
        case 'I4':
          this.endInt(data)
          break
        case 'I8':
          this.endI8(data)
          break
        case 'DOUBLE':
          this.endDouble(data)
          break
        case 'STRING':
        case 'NAME':
          this.endString(data)
          break
        case 'ARRAY':
          this.endArray(data)
          break
        case 'STRUCT':
          this.endStruct(data)
          break
        case 'BASE64':
          this.endBase64(data)
          break
        case 'DATETIME.ISO8601':
          this.endDateTime(data)
          break
        case 'VALUE':
          this.endValue(data)
          break
        case 'PARAMS':
          this.endParams(data)
          break
        case 'FAULT':
          this.endFault(data)
          break
        case 'METHODRESPONSE':
          this.endMethodResponse(data)
          break
        case 'METHODNAME':
          this.endMethodName(data)
          break
        case 'METHODCALL':
          this.endMethodCall(data)
          break
        case 'NIL':
          this.endNil(data)
          break
        case 'DATA':
        case 'PARAM':
        case 'MEMBER':
          // Ignored by design
          break
        default:
          this.onError('Unknown XML-RPC tag \'' + el + '\'')
          break
      }
    }
    catch (e) {
      this.onError(e)
    }
  }

  endNil = function (data: any) {
    this.push(null)
    this.value = false
  }

  endBoolean = function (data: any) {
    if (data === '1') {
      this.push(true)
    }
    else if (data === '0') {
      this.push(false)
    }
    else {
      throw new Error('Illegal boolean value \'' + data + '\'')
    }
    this.value = false
  }

  endInt = function (data: any) {
    var value = parseInt(data, 10)
    if (isNaN(value)) {
      throw new Error('Expected an integer but got \'' + data + '\'')
    }
    else {
      this.push(value)
      this.value = false
    }
  }

  endDouble = function (data: any) {
    var value = parseFloat(data)
    if (isNaN(value)) {
      throw new Error('Expected a double but got \'' + data + '\'')
    }
    else {
      this.push(value)
      this.value = false
    }
  }

  endString = function (data: any) {
    this.push(data)
    this.value = false
  }

  endArray = function (data: any) {
    var mark = this.marks.pop()
    this.stack.splice(mark, this.stack.length - mark, this.stack.slice(mark))
    this.value = false
  }

  endStruct = function (data: any) {
    var mark = this.marks.pop()
      , struct = []
      , items = this.stack.slice(mark)
      , i = 0

    for (; i < items.length; i += 2) {
      struct[items[i]] = items[i + 1]
    }
    this.stack.splice(mark, this.stack.length - mark, struct)
    this.value = false
  }

  endBase64 = function (data: any) {
    var buffer = new Buffer(data, 'base64')
    this.push(buffer)
    this.value = false
  }

  endDateTime = function (data: any) {
    let dateFormat = new dateFormatter();

    var date = dateFormat.decodeIso8601(data)
    this.push(date)
    this.value = false
  }


  endI8 = function (data: any) {
    var isInteger = /^-?\d+$/
    if (!isInteger.test(data)) {
      throw new Error('Expected integer (I8) value but got \'' + data + '\'')
    }
    else {
      this.endString(data)
    }
  }

  endValue = function (data: any) {
    if (this.value) {
      this.endString(data)
    }
  }

  endParams = function (data: any) {
    this.responseType = 'params'
  }

  endFault = function (data: any) {
    this.responseType = 'fault'
  }

  endMethodResponse = function (data: any) {
    this.type = 'methodresponse'
  }

  endMethodName = function (data: any) {
    this.methodname = data
  }

  endMethodCall = function (data: any) {
    this.type = 'methodcall'
  }
}


