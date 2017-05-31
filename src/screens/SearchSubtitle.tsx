import * as RX from 'reactxp'
const { View, Component, Text, TextInput, ScrollView, Alert, StatusBar, ActivityIndicator } = RX;
import { ComponentBase } from 'resub'

import Button from '../components/Button';
//import ParseSRT from '../utils/parse-srt';
import ParseSRT from '../utils/subtitles-parser';

import TextPlayer from '../components/TextPlayer'
import OpenSubtitlesStore from '../stores/OpenSubtitlesStore';

import * as _  from 'lodash'
import { VirtualListView, VirtualListViewItemInfo  } from 'reactxp-virtuallistview'

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
    searchValue?: string,
    searchResult?: Array<any>,
    token?: string,
    subtitleView?: string
    isLoading? : boolean,
    itens?: Array<any>
}

const _headerItemHeight = 20;
const _fruitItemHeight = 32;
const _headerItemTemplate = 'header';
const _fruitItemTemplate = 'fruit';


export default class SearchSubtitle extends ComponentBase<null, SearchSubtitleState> {

    protected _buildState(props: {}, initialBuild: boolean): SearchSubtitleState {
            return {
                token: OpenSubtitlesStore.getToken(),
                searchResult: OpenSubtitlesStore.getSearchResult(),
                subtitleView: OpenSubtitlesStore.downloadedSubtitle(),
                isLoading: OpenSubtitlesStore.isLoading(),
                itens :[{
                key: 'header1',
                height: _headerItemHeight,
                text: 'Domstic Fruits',
                template: _headerItemTemplate
            }, {
                key: 'bannana',
                height: _fruitItemHeight,
                text: 'Banana',
                template: _fruitItemTemplate
            }, {
                key: 'apple',
                height: _fruitItemHeight,
                text: 'Apple',
                template: _fruitItemTemplate
            }]
            }
    }
    
    protected _componentDidRender()
    {
        OpenSubtitlesStore.logIn()
    }    
    

    render(): JSX.Element | null {
        
      return (
          <ScrollView  keyboardDismissMode={"on-drag"} keyboardShouldPersistTaps={true}>
            <View>
                <Text style={_styles.headerText}>HEADER</Text>
            </View>
            <View>
                <TextPlayer captions={ParseSRT.fromSrt(this.state.subtitleView, true)} duration={ParseSRT.fromSrt(this.state.subtitleView, true).slice(-1)[0].endTime} />
            </View>
            <View style={_styles.content}>
                <View style={_styles.textInputContainer}>
                    <TextInput style={_styles.textInput} onChangeText={this._onChangeText} value={this.state.searchValue} />
                </View>
                <Button text="Check" onPress={this._buttonPress} backgroundColor="grey"></Button>
                { this.state.isLoading ? <ActivityIndicator color="blue" size="large"/> : null}
                <VirtualListView

                    itemList={ this.state.itens }
                    renderItem={ this._renderItem }
                    animateChanges={ true }
                    skipRenderIfItemUnchanged={ false }
                    logInfo={(log: string) => { console.log(log)}}
                />
            </View>
        </ScrollView>
        )
    }
    
    private _renderItem(item: VirtualListViewItemInfo, hasFocus?: boolean) {
        debugger
        return (
            <RX.View>
                <Text key={item.height + '-search767'} selectable={true} onPress={ this._itemClick.bind(this, item.height) } >{item.template}</Text>
            </RX.View>
        );
    }

    private _itemClick = (id: any) => {
            let is = OpenSubtitlesStore.downloadSubtitles(this.state.token, id)
            this.setState({
            isLoading: is
            })
   }

    private _onChangeText = (newValue : string) => { 
        this.setState({searchValue : newValue})
    }

    private _buttonPress = () => {
        let is = OpenSubtitlesStore.searchSubtitles(this.state.token, {query: this.state.searchValue});
        this.setState({
            isLoading: is
        })
    }
    
   
}  