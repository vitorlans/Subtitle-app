import * as RX from 'reactxp'
const { View, Component, Text, TextInput, ScrollView, Picker, Alert } = RX;

interface TextPlayerState {
    timer?: number
    duration?: number,
    captions?: any,
    index?: number
}

interface TextPlayerProps {
    captions?: any,
    duration?: number
}

let TIMERID : NodeJS.Timer;
export default class TextPlayer extends Component<TextPlayerProps, TextPlayerState> {
    constructor(props : TextPlayerProps) {
        super(props);
                
        this.state = {
            timer: 0,
            duration: this.props.duration ? this.props.duration : 0,
            captions: this.props.captions ? this.props.captions : [],
            index:0
        }
    }
    
    componentWillReceiveProps(nextProps: any) {
        this.setState({captions: nextProps.captions, duration: nextProps.duration, timer: 0, index: 0});

        
    }
    
    // shouldComponentUpdate(nextProps:any, nextState:any) {
    //     return this.props.captions.length != nextProps.captions.length;
    // }
    
    componentDidMount() {
      this.setTimer();
    }

    componentDidUpdate(prevProps: TextPlayerProps, prevState: TextPlayerState) {
      //this.setTimer();
    }

    setTimer(){
      const self = this;
      TIMERID = setInterval(() => {
         self.setState({
            timer : self.state.timer + 1000
         }, () => {
             
             self.setCaption()
            
        })
            // if(self.state.timer >= self.state.duration) {
            //      clearInterval(TIMERID)
            //  }
        }, 1000);
    }
    setCaption(){
        
        this.state.captions.forEach((element:any, index:any, array:any) => {
            if(this.state.timer >= element.startTime && this.state.timer <= element.endTime){
                this.setState({
                    index : index
                })
            };
        })
    }

    componentWillUnmont(){
        clearInterval(TIMERID);
    }

    render() {
        return(
        <View>
           {this.state.captions ? <Text>{ this.state.captions[this.state.index].text }</Text> : null  }
        </View>
        )
    }
}