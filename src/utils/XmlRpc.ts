import Deserializer from './Deserializer'



function getXMLHttpRequest() {
  return new XMLHttpRequest();
}


function checkRequestStatus(request : any) {
  if (request.status != 200 && request.status != 0) {
    var exception = request.status.toString() + " : "
    exception += request.statusText ? request.statusText : "Network error"
    //exception.errCode = request.status

    throw exception
  }
}

function readyStateChangeFunc(request : any, lambda : any) {
  return function () {
    if (request.readyState != Request.COMPLETED) return
    try {
      checkRequestStatus(request)
      lambda(request)
    } catch (e) { request.onnetworkerror(e) }
  }
}

function getOnreadystatechangeCallback(req:any) {
  let arr = ["readyState", "responseBody", "responseStream", "responseText", "responseXML", "status", "statusText"]
  return function () {
    for (var i = 0; i != arr.length; ++i) {
      try {
        req[arr[i]] = req._request[arr[i]]
      } catch (e) { }
    }
    if (req.onreadystatechange) {
      req.onreadystatechange()
    }
  }
}




class Request {
  public static UNINITIALIZED = 0
  public static LOADING = 1
  public static LOADED = 2
  public static INTERACTIVE = 3
  public static COMPLETED = 4

  url : string
  content: string
  callback: any
  contentType = "text/xml"

  requestMethod? : string
  readyState = 0
  responseBody: any
  responseStream: any
  responseText : any
  responseXML : any
  status : any
  statusText : any
  _request: any

  constructor(url : any, content:any, callback:any){
    this.url = url
    this.content = content
    this.callback = callback
    this._request = getXMLHttpRequest() as any
    this._request.onreadystatechange = getOnreadystatechangeCallback(this);
  }


  abort() {
    return this._request.abort()
  }

  getAllResponseHeaders() {
    return this._request.getAllResponseHeaders()
  }

  getResponseHeader(str : any) {
    return this._request.getResponseHeader(str)
  }

  open(method: any, url:any, async?:any, user?:any, password?:any) {
    if (typeof (async) == "undefined") async = true
    if (typeof (user) == "undefined") user = null
    if (typeof (password) == "undefined") password = null
    return this._request.open(method, url, async, user, password)
  }

  send(content:any) {
    if (typeof (content) == "undefined") content = ""
    var tmp = this._request.send(content)

  }

  setRequestHeader(name:any, value:any) {
    return this._request.setRequestHeader(name, value)
  }

  // copyAttributes() {
  //   let arr = ["readyState", "responseBody", "responseStream", "responseText", "responseXML", "status", "statusText"]
  //   for (var i = 0; i != arr.length; ++i) {
  //     try {
  //       this[arr[i]] = this._request[arr[i]]
  //     } catch (e) { }
  //   }
  // }


  process() {
    if (this.callback) {
      this._request.onnetworkerror = this.onnetworkerror
      this._request.onreadystatechange = readyStateChangeFunc(this._request, this.callback)
    }
    var async = this.callback ? true : false
    if (!this.requestMethod) {
      if (!this.content) {
        this.requestMethod = "GET"
      } else {
        this.requestMethod = "POST"
      }
    }
    this.open(this.requestMethod, this.url, async)
    //this.setRequestHeader("Content-Length", this.content != null ? this.content.length : 0)
    if (this.content != null)
      this.setRequestHeader("Content-Type", this.contentType);
    this.send(this.content)
    if (async) return

    // this.copyAttributes()
    checkRequestStatus(this)
  }

  onnetworkerror(e: any) {
    alert(e)
  }
}




function isA(obj :any, type:any) {
  return obj.constructor.prototype == type.prototype
}

function isInt(obj:any) {
  if (!isA(obj, Number)) return false
  return (obj % 1) == 0
}

function isFloat(obj:any) {
  if (!isA(obj, Number)) return false
  return !isInt(obj)
}




// if (!window.Node) {
//   window.Node = {
//     ELEMENT_NODE: 1,
//     ATTRIBUTE_NODE: 2,
//     TEXT_NODE: 3,
//     CDATA_SECTION_NODE: 4,
//     ENTITY_REFERENCE_NODE: 5,
//     ENTITY_NODE: 6,
//     PROCESSING_INSTRUCTION_NODE: 7,
//     COMMENT_NODE: 8,
//     DOCUMENT_NODE: 9,
//     DOCUMENT_TYPE_NODE: 10,
//     DOCUMENT_FRAGMENT_NODE: 11,
//     NOTATION_NODE: 12
//   }
// }

function makeTag(tagName:any, strValue:any) {
  return "<" + tagName + ">" + strValue + "</" + tagName + ">"
}




function visitChildren(node:any, lamdba:any, optionalNodeTypeRestriction:any) {
  var nodeList = node.children
  eachInNodeList(nodeList, lamdba, optionalNodeTypeRestriction)
}


function eachInNodeList(nodeList:any, lambda:any, optionalNodeTypeRestriction:any) {
  if(nodeList != null) {
  for (var i = 0; i != nodeList.length; ++i) {
    // if (optionalNodeTypeRestriction &&
    //   nodeList[i].nodeType != optionalNodeTypeRestriction) {
    //   continue
    // }
    lambda(nodeList[i])
  }
}
}


function getTextValueOfChild(node:any) {
  var str
  visitChildren(
    node,
    function (x:any) { str = x.nodeValue },
    Node.TEXT_NODE
  )
  if (!str) {
    str = ""
  }
  str = str.replace(/^\s+/, "")
  return str.replace(/\s+$/, "")
}


function getNamedChild(node:any, name:any) {
  var ret
  visitChildren(
    node,
    function (x:any) { if (x.nodeName == name) ret = x },
    Node.ELEMENT_NODE
  )
  return ret
}




function getNamedChildren(node:any, name:any) {
  var ret = [] as any
  visitChildren(
    node,
    function (x :any) { if (x.nodeName == name) ret.push(x) },
    Node.ELEMENT_NODE
  )
  return ret
}



















function encodeXmlRpc(arg: any) {

 if (isA(arg,String)){
 arg = arg.replace(/&/g, "&amp;")
 arg = arg.replace(/</g, "&lt;")
 arg = arg.replace(/>/g, "&gt;")
 return makeTag("string", arg)
 }else if (isA(arg,Boolean)){
 return makeTag("boolean", (arg?"1":"0"))
 }else if (isA(arg,Date)){
 return makeTag("dateTime.iso8601", getIso8601Str(arg)) 
 }else if (isA(arg,Array)){
 return makeTag("array", makeTag("data", makeArrayValues(arg)))
 }else if (isA(arg,Number)){
 if (isInt(arg)){
 return makeTag("int",arg) 
 } 
 return makeTag("double", arg)
 }else{
  return makeTag("struct", makeStructMembers(arg))
 }
}

function makeArrayValues (arg:any) {
 var str = "";
 for (var i=0; i!=arg.length; ++i){
 str += makeTag("value", encodeXmlRpc(arg[i]))
 }
 return str
}

function makeStructMembers (arg:any) {
 var str = ""
 for (var p in arg){
 if (isA(arg[p],Function)) continue;
 str += makeTag("member", makeTag("name",p)+makeTag("value", encodeXmlRpc(arg[p]))) 
 }
 return str
}

function getIso8601Str(date:any){
 var str = date.getFullYear().toString()
 var month = date.getMonth()+1
 if (month<10) str += "0"
 str += month
let day = date.getDate()
 if (day<10) str += "0"
 str += day
 str += "T"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  return str
}



function getHandler(rpc:any, lambda:any) {
  if (lambda == null) return null
  return function (request:any) {
    rpc.handleAnswer(request, lambda)
  }
}




function addFunction(obj:any, name:any, javascriptName:any) {
  obj[javascriptName] = function () {
    let retVal = ""
    let str = "retVal = this.call(\"" + name + "\""
    for (var i = 0; i != arguments.length; ++i) {
      str += ", arguments[" + i + "]"
    }
    str += ")"
    eval(str)
    return retVal
  }
}


export default class XmlRpc {
  url: any;
  onerror: any;

  constructor(url: any) {
    this.url = url;
  }

  getObject(url:any, functionNameArr:any) {
    let obj = new XmlRpc(url)
    functionNameArr = functionNameArr;
    for (var i = 0; i != functionNameArr.length; ++i) {
      let functionName = functionNameArr[i]
      addFunction(obj, functionName, functionName.replace(/\./g, "_"))
    }
    return obj
  }

  addArgument(arg : any) {
    return makeTag("param", makeTag("value", encodeXmlRpc(arg)))
  }


  handleFault (fault : any) {

  }

  handleAnswer(request: any, cb?: any) {
    if (request == null) throw "ERROR: no xml returned"

    var deserializer = new Deserializer()

      let responseData = request._response ? request._response : request.response
      return deserializer.deserializeMethodResponse(responseData, function(err: any, result:any) {
         return cb(err, result);
      });
  }

  call(method: string, params?: Array<string>, callback?: any) {
    
    var request = '<?xml version="1.0"?>'
    request += "<methodCall>"
    request += makeTag("methodName", method)

    var callback = callback;
    var paramsXml = ""
    for (var i = 0; i != params.length; ++i) {
      paramsXml += this.addArgument(params[i])
    }
    if (paramsXml != "")
      request += makeTag("params", paramsXml)
    request += "</methodCall>"

    var req = new Request(this.url, request, getHandler(this, callback))

    if (callback && this.onerror) {
      req.onnetworkerror = this.onerror
    }

    req.process()

    if (callback == null) {
      return this.handleAnswer(request)
    }
  }

}