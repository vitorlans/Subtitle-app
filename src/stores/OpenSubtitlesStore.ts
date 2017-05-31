import { StoreBase, AutoSubscribeStore, autoSubscribe, autoSubscribeWithKey } from 'resub';
import OS from '../utils/OpenSubtitles';
import { Buffer } from 'buffer';
import * as pako from 'pako'
import { Uint8ToString } from "../utils/uint8tostring";

const TriggerKeys = {
    Login: 'Login',
    SearchSubtitles: 'SearchSubtitles',
    DownloadSubtitles: 'downloadSubtitles'
}

interface searchOpts {
    query:string,
    season?:string,
    episode?: string,
    language?: string,
    limit?:number
}

@AutoSubscribeStore
class OpenSubtitlesStore extends StoreBase {
    private _token: string = "";
    private _searchResult: Array<any> = new Array<any>();
    private _opensubtitles = new OS();
    private _downloadedSub = "";
    private _isLoading = false;


    @autoSubscribeWithKey(TriggerKeys.Login)
    getToken() {
        return this._token;
    }

    logIn() {
        if (!this._token) {
            this._opensubtitles.LogIn("", "", "en", "OSTestUserAgentTemp")
                .then((res: any) => {
                    this._token = res.token;
                    this.trigger(TriggerKeys.Login);
                });
        }
        return this._token;
    }

    @autoSubscribeWithKey(TriggerKeys.SearchSubtitles)
    getSearchResult(){
        return this._searchResult;
    }

    searchSubtitles(token: string, opts: searchOpts) {
       this._isLoading = true
            this._opensubtitles.SearchSubtitles(token, [{
                    query: opts.query,
                    season: opts.season || '',
                    episode: opts.episode || '',
                    sublanguageid: opts.language || 'eng',
                }],
                { limit: opts.limit || 20 }
            ).then((res : any) => {
                if(res.data) {
                    let data = res.data;
                    //Remove subtitles different of srt type
                    data = data.filter(function(subtitle : any) { return subtitle.SubFormat == "srt" });

                    // Remove subtitles with cd1/cd2 tags
                    data = data.filter(function(subtitle : any) { 
                        return !subtitle.SubFileName.match(/cd(.| )1|cd(.| )2/i);
                    });

                    this._searchResult = data;
                }
                this._isLoading = false

                this.trigger(TriggerKeys.SearchSubtitles)
                this.trigger()
            })
        return  this._isLoading
    }

    @autoSubscribeWithKey(TriggerKeys.DownloadSubtitles)
    downloadedSubtitle(){
        return this._downloadedSub;
    }

    downloadSubtitles(token: string, ListIdSubtitleFile: Array<Number>) {
         this._isLoading = true;

        this._opensubtitles.DownloadSubtitles(token, [ListIdSubtitleFile])
            .then((res: any) => {
                let gzipData = Buffer.from(res.data[0].data, 'base64')
                var k = pako.ungzip(gzipData)
                let str = Uint8ToString(k);

                this._downloadedSub = str;
                this._isLoading = false

              
                this.trigger(TriggerKeys.DownloadSubtitles)
                this.trigger()
            })
        
            return  this._isLoading;
        }

        @autoSubscribe
        public isLoading(){
            return this._isLoading;
        }
    }

export default new OpenSubtitlesStore();
