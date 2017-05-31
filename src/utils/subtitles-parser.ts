class parser {
    /**
     * Converts SubRip subtitles into array of objects
     * [{
     *     id:        `Number of subtitle`
     *     startTime: `Start time of subtitle`
     *     endTime:   `End time of subtitle
     *     text: `Text of subtitle`
     * }]
     *
     * @param  {String}  data SubRip suntitles string
     * @param  {Boolean} ms   Optional: use milliseconds for startTime and endTime
     * @return {Array}  
     */
     fromSrt = function(data: any, ms?: boolean) {
        var useMs = ms ? true : false;

        data = data.replace(/\r/g, '');
        var regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
        data = data.split(regex);
        data.shift();

        var items = [];
        for (var i = 0; i < data.length; i += 4) {
            items.push({
                id: data[i].trim(),
                startTime: useMs ? this.timeMs(data[i + 1].trim()) : data[i + 1].trim(),
                endTime: useMs ? this.timeMs(data[i + 2].trim()) : data[i + 2].trim(),
                text: data[i + 3].trim()
            });
        }
        
        if(items.length === 0) {
            items.push(
                {
                    id: 0,
                    startTime: 0,
                    endTime: 0,
                    text: ""
                }
            );
        }

        return items;
    };

    /**
     * Converts Array of objects created by this module to SubRip subtitles
     * @param  {Array}  data
     * @return {String}      SubRip subtitles string
     */
    toSrt = function(data : Array<any>) {
        var res = '';

        for (var i = 0; i < data.length; i++) {
            var s = data[i];

            if (!isNaN(s.startTime) && !isNaN(s.endTime)) {
                s.startTime = this.msTime(parseInt(s.startTime, 10));
                s.endTime = this.msTime(parseInt(s.endTime, 10));
            }

            res += s.id + '\r\n';
            res += s.startTime + ' --> ' + s.endTime + '\r\n';
            res += s.text.replace('\n', '\r\n') + '\r\n\r\n';
        }

        return res;
    };

    private timeMs = function(val : any) {
        var regex = /(\d+):(\d{2}):(\d{2}),(\d{3})/;
        var parts = regex.exec(val) as any;

        if (parts === null) {
            return 0;
        }

        for (var i = 1; i < 5; i++) {
            parts[i] = parseInt(parts[i], 10);
            if (isNaN(parts[i])) parts[i] = 0;
        }

        // hours + minutes + seconds + ms
        return parts[1] * 3600000 + parts[2] * 60000 + parts[3] * 1000 + parts[4];
    };

    private msTime = function(val : any) {
        var measures = [ 3600000, 60000, 1000 ]; 
        var time = [];

        for (var i in measures) {
            var res = (val / measures[i] >> 0).toString();
            
            if (res.length < 2) res = '0' + res;
            val %= measures[i];
            time.push(res);
        }

        var ms = val.toString();
        if (ms.length < 3) {
            for (var c = 0; c <= 3 - ms.length; c++)
            {
                ms = '0' + ms;
            }
        }

        return time.join(':') + ',' + ms;
    };

}

export default new parser();