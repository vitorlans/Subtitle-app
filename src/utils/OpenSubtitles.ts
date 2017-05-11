import xmlrpc from './XmlRpc';

const url = 'http://api.opensubtitles.org:80/xml-rpc'
const url_ssl = 'https://api.opensubtitles.org:443/xml-rpc'

export default class OS {
    client : xmlrpc;
    constructor(endpoint? : string, ssl? : boolean ) {
        const uri = endpoint || (ssl ? url_ssl : url)

        this.client = new xmlrpc(uri);
    }

    handleError(error: any) {
        error.message && error.message.match('XML-RPC tag \'TITLE\'') && (error.message = 'API seems offline')
        return error
    }

    call(method: any, args: any) {
        return new Promise((resolve: any, reject: any) => {
            let n = args as Array<string>
            this.client.call(method, n, (err:any, data:any) => {
                if (err) return reject(this.handleError(err))
                resolve(data)
            })
        })
    }

    LogIn(username: any, password :any, language :any, useragent: any) {
        return this.call('LogIn', arguments)
    }
    LogOut(token: any) {
        return this.call('LogOut', arguments)
    }
    SearchSubtitles(token: any, array_queries: any) {
        return this.call('SearchSubtitles', arguments)
    }
    SearchToMail(token: any, array_langs:any, array_movies:any) {
        return this.call('SearchToMail', arguments)
    }
    CheckSubHash(token:any, array_subs_hash:any) {
        return this.call('CheckSubHash', arguments)
    }
    CheckMovieHash(token:any, array_movies_hash:any) {
        return this.call('CheckMovieHash', arguments)
    }
    CheckMovieHash2(token:any, array_movies_hash:any) {
        return this.call('CheckMovieHash2', arguments)
    }
    InsertMovieHash(token:any, array_movies_info:any) {
        return this.call('InsertMovieHash', arguments)
    }
    TryUploadSubtitles(token:any, array_sub:any) {
        return this.call('TryUploadSubtitles', arguments)
    }
    UploadSubtitles(token:any, array_sub:any) {
        return this.call('UploadSubtitles', arguments)
    }
    DetectLanguage(token:any, array_texts:any) {
        return this.call('DetectLanguage', arguments)
    }
    DownloadSubtitles(token:any, array_subid:any) {
        return this.call('DownloadSubtitles', arguments)
    }
    ReportWrongMovieHash(token:any, IDSubMovieFile:any) {
        return this.call('ReportWrongMovieHash', arguments)
    }
    ReportWrongImdbMovie(token:any, array_movie:any) {
        return this.call('ReportWrongImdbMovie', arguments)
    }
    GetSubLanguages(language:any) {
        return this.call('GetSubLanguages', arguments)
    }
    GetAvailableTranslations(token:any, program:any) {
        return this.call('GetAvailableTranslations', arguments)
    }
    GetTranslation(token:any, iso639:any, format:any, program:any) {
        return this.call('GetTranslation', arguments)
    }
    GetUserInfo(token:any) {
        return this.call('GetUserInfo', arguments)
    }
    SearchMoviesOnIMDB(token:any, query:any) {
        return this.call('SearchMoviesOnIMDB', arguments)
    }
    GuessMovieFromString(token:any, array_titles:any) {
        // Beta - might break or stop working
        return this.call('GuessMovieFromString', arguments)
    }
    GetIMDBMovieDetails(token:any, imdbid:any) {
        return this.call('GetIMDBMovieDetails', arguments)
    }
    InsertMovie(token:any, array_movie:any) {
        return this.call('InsertMovie', arguments)
    }
    SubtitlesVote(token:any, array_vote:any) {
        return this.call('SubtitlesVote', arguments)
    }
    GetComments(token:any, array_subids:any) {
        return this.call('GetComments', arguments)
    }
    AddComment(token:any, array_comments:any) {
        return this.call('AddComment', arguments)
    }
    AddRequest(token:any, array_request:any) {
        return this.call('AddRequest', arguments)
    }
    SetSubscribeUrl(token:any, url:any) {
        return this.call('SetSubscribeUrl', arguments)
    }
    SubscribeToHash(token:any, array_hashs:any) {
        return this.call('SubscribeToHash', arguments)
    }
    AutoUpdate(program_name:any) {
        return this.call('AutoUpdate', arguments)
    }
    SuggestMovie(token:any, querystring:any) {
        return this.call('SuggestMovie', arguments)
    }
    QuickSuggest(token:any, str:any, sublanguageid:any) {
        return this.call('QuickSuggest', arguments)
    }
    NoOperation(token:any) {
        return this.call('NoOperation', arguments)
    }
    ServerInfo() {
        return this.call('ServerInfo', [])
    }
}