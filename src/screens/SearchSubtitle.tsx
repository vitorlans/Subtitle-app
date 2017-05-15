import * as RX from 'reactxp'
const { View, Component, Text, TextInput, ScrollView, Picker, Alert, WebView } = RX;
import { ComponentBase } from 'resub'

import Button from '../components/Button';


import OpenSubtitlesStore = require('../stores/OpenSubtitlesStore')

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

interface SearchSubtitleState {
    size?: string,
    age?: string,
    name?:string, 
    logIn?: any
    searchSubtitles?: any,
    getToken?: string,
    downloadSubtitles?: any

}


export default class SearchSubtitle extends ComponentBase<null, SearchSubtitleState> {

    protected _buildState(props: {}, initialBuild: boolean): SearchSubtitleState {
            return {
                getToken: OpenSubtitlesStore.getToken(),
                name: ""
            }
    }
    
    protected _componentDidRender()
    {
        if(!this.state.getToken)
            OpenSubtitlesStore.logIn()
    }    
    

    render(): JSX.Element | null {

    
      return (
        <ScrollView>
            <View>
                <Text style={_styles.headerText}>HEADER</Text>
                <Text style={_styles.headerInfo}>Calculate your pet age in human years</Text>
            </View>
            <View style={_styles.content}>
                <Text style={_styles.label}>{this.state.name}</Text>


                <Button text="Check" onPress={this._buttonPress} backgroundColor="grey"></Button>
            </View>
        </ScrollView>
      );
    }
    
    private _ageTextInputChange = (newString: string) => {
        let newText = newString.replace(/[^0-9]+/g, '');


        this.setState({age : newText})  
    }

    private _buttonPress = () => {
        console.log(this.state.getToken)
    }

    private _pickerChange = (itemValue: string, itemPosition: number) => {
        this.setState({
            size: itemValue
        })
    }
    
   
}  