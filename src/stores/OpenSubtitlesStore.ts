import { StoreBase, AutoSubscribeStore, autoSubscribe, autoSubscribeWithKey } from 'resub';
import OS from '../utils/OpenSubtitles';
import { Buffer } from 'buffer';
import * as pako  from 'pako'

@AutoSubscribeStore
//store in resub, is a class extends from StoreBase.
class OpenSubtitlesStore extends StoreBase {
    private _token : string = "";
    private _opensubtitles = new OS();

    @autoSubscribeWithKey("Login")
    getToken():string {
        return this._token;
    }

    logIn() {
        return this._opensubtitles.LogIn("", "", "en", "OSTestUserAgentTemp")
            .then((res: any) => {
                this._token = res.token;
                this.trigger("Login");
                return res.token as string;
            });
    }

    searchSubtitles(token : string, opts: any) {
            this._opensubtitles.SearchSubtitles(token, [{
            query: opts.query,
            season: opts.season || undefined,
            episode: opts.episode || undefined,
            sublanguageid: opts.language || 'eng',
            limit: 20
        }])
    }

    downloadSubtitles(token: string, ListIdSubtitleFile: Array<Number>){
         this._opensubtitles.DownloadSubtitles(token, ListIdSubtitleFile)
         .then((res : any) => {
                        let gzipData = Buffer.from(res.data[0].data, 'base64')
                        var k = pako.ungzip(gzipData)
                        let str:string = String.fromCharCode.apply(null, k);

                        return str;
                    })
    }
}

// export a instance of class HelloStore
export = new OpenSubtitlesStore();