import * as RX from 'reactxp'
const { View, Component, Text, TextInput, ScrollView, Picker, Alert, WebView } = RX;

import Button from '../components/Button';
import OS from '../utils/OpenSubtitles';
import { Buffer } from 'buffer';
import * as pako  from 'pako'


const _styles = {
    headerText:RX.Styles.createTextStyle({
        fontSize:48
    }),
    content: RX.Styles.createViewStyle({
        flex: 1,
        justifyContent: 'flex-start',
        //alignItems: 'center',
        marginLeft: RX.Platform.getType() == "web" ? 24 : 16,
        marginRight: RX.Platform.getType() == "web" ? 24 : 16,
    }),
    modal: RX.Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'blue',
        alignItems: 'center'
    }),
    headerInfo: RX.Styles.createTextStyle({
        fontSize:24,
        textAlign:'center'
    }),
    label: RX.Styles.createTextStyle({
        marginTop: 16,
        marginBottom: 1,
        color: 'grey',
        fontSize: 16,
        fontWeight: 'bold',      
    }), 
    textInput: RX.Styles.createTextInputStyle({
        // paddingLeft: 26,
        // paddingRight: 19,
        // margin: 8,
        // borderRadius: 3,
        // overflow: 'hidden',
        // backgroundColor: 'grey',
         fontSize: 18,
        // color: 'black',
         height: 40
    }),
    textInputContainer: RX.Styles.createViewStyle({
        borderColor: 'grey',
        borderStyle: 'solid',
        borderBottomWidth: 1
    }),
    picker: RX.Styles.createPickerStyle({
        borderColor: 'grey',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        height:40
    })


}

interface DogAgeState {
    size?: string,
    age?: string,
    name?:string 
}


export default class SearchSubtitle extends Component<null, DogAgeState> {

    constructor() {
        super();

        this.state = {
            size: "1",
            age: "",
            name: ""
        }
    }
    componentDidMount() {

       let opensubtitles = new OS();
        opensubtitles.LogIn("", "", "en", "OSTestUserAgentTemp")
            .then((res: any) => {
                console.log(res.token);
                opensubtitles.SearchSubtitles(res.token, [{
                    query: 'breaking bad',
                    sublanguageid: 'por',
                    episode: 1,
                    season: 1,
                    limit: 10
                }]).then((res2 : any) => {
                     console.log(res2);
                    opensubtitles.DownloadSubtitles(res.token, [res2.data[0].IDSubtitleFile]).then((res3 : any) => {
                        console.log(res3);
                        let gzipData = Buffer.from(res3.data[0].data, 'base64')

                        var k = pako.ungzip(gzipData)

                        let str:string = String.fromCharCode.apply(null, k);
                        this.setState({
                            name: str
                        })
                        console.log(str)
                    })
                })
            })
            .catch(err => {
                console.log(err);
            });
       
    }

    render(): JSX.Element | null {

    
      return (
        <ScrollView>
            <View>
                <Text style={_styles.headerText}>HEADER</Text>
                <Text style={_styles.headerInfo}>Calculate your pet age in human years</Text>
            </View>
            <View style={_styles.content}>
                <WebView
                    url="https://www.youtube.com/embed/BceLxxx1c-s" javaScriptEnabled={true}  style={RX.Styles.createViewStyle({height:315, width:420})}  />
                <Text style={_styles.label}>{this.state.name}</Text>


                <Button text="Check" onPress={this._buttonPress} backgroundColor="#000"></Button>
            </View>
        </ScrollView>
      );
    }
    
    private _ageTextInputChange = (newString: string) => {
        let newText = newString.replace(/[^0-9]+/g, '');


        this.setState({age : newText})  
    }

    private _buttonPress = () => {
        Alert.show("TESTE", "TESTE", [{text: "OK"}, {text:"Cancelar"}])
    }

    private _pickerChange = (itemValue: string, itemPosition: number) => {
        this.setState({
            size: itemValue
        })
    }
    
   
}  