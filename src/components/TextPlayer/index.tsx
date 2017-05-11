import * as RX from 'reactxp'
const { View, Component, Text, TextInput, ScrollView, Picker, Alert } = RX;

const textData = [ { index: 1,
    start: 26068,
    end: 29278,
    duration: 3210,
    text: '[♪♪♪]' },
  { index: 2,
    start: 29446,
    end: 30446,
    duration: 1000,
    text: '[PANTING]' },
  { index: 3,
    start: 30614,
    end: 31906,
    duration: 1292,
    text: '[GLASS SHATTERING]' },
  { index: 4,
    start: 61729,
    end: 63771,
    duration: 2042,
    text: '[GRUNTING]' },
  { index: 5,
    start: 69236,
    end: 72780,
    duration: 3544,
    text: 'Oh, my God. Christ!' },
  { index: 6,
    start: 75993,
    end: 78661,
    duration: 2668,
    text: 'Shit.' },
  { index: 7,
    start: 78829,
    end: 81205,
    duration: 2376,
    text: '[SIRENS WAILING IN DISTANCE]' },
  { index: 8,
    start: 84918,
    end: 87378,
    duration: 2460,
    text: 'Oh, God. Oh, my God.' },
  { index: 9,
    start: 87546,
    end: 90840,
    duration: 3294,
    text: 'Oh, my God. Oh, my God.\nThink, think, think.' },
  { index: 10,
    start: 91008,
    end: 93676,
    duration: 2668,
    text: '[LIQUID SPLASHING]' },
  { index: 11,
    start: 93844,
    end: 95511,
    duration: 1667,
    text: 'Oh, my gosh.' },
  { index: 12,
    start: 103937,
    end: 106481,
    duration: 2544,
    text: '[PANTING THEN INHALES]' },
  { index: 13,
    start: 115949,
    end: 118868,
    duration: 2919,
    text: '[EXHALES AND COUGHS]' },
  { index: 14,
    start: 124958,
    end: 127210,
    duration: 2252,
    text: 'Okay. Come on,\ncome on, come on.' },
  { index: 15,
    start: 127377,
    end: 129212,
    duration: 1835,
    text: 'Come on.' },
  { index: 16,
    start: 134051,
    end: 136302,
    duration: 2251,
    text: 'My name is\nWalter Hartwell White.' },
  { index: 17,
    start: 136470,
    end: 139222,
    duration: 2752,
    text: 'I live at 308 Negra Arroyo Lane,' },
  { index: 18,
    start: 139389,
    end: 141974,
    duration: 2585,
    text: 'Albuquerque, New Mexico, 87104.' },
  { index: 19,
    start: 142142,
    end: 143476,
    duration: 1334,
    text: 'To all law-enforcement entities,' },
  { index: 20,
    start: 143644,
    end: 146020,
    duration: 2376,
    text: 'this is not an admission\nof guilt.' },
  { index: 21,
    start: 146188,
    end: 149649,
    duration: 3461,
    text: 'I am speaking to my family now.' },
  { index: 22,
    start: 151068,
    end: 152068,
    duration: 1000,
    text: '[CRYING]' },
  { index: 23,
    start: 155781,
    end: 157907,
    duration: 2126,
    text: 'Skyler.' },
  { index: 24,
    start: 158075,
    end: 160243,
    duration: 2168,
    text: 'You are the love of my life.' },
  { index: 25,
    start: 160410,
    end: 162370,
    duration: 1960,
    text: 'I hope you know that.' },
  { index: 26,
    start: 163747,
    end: 165915,
    duration: 2168,
    text: 'Walter Jr.' },
  { index: 27,
    start: 166083,
    end: 168334,
    duration: 2251,
    text: 'You\'re my big man.' },
  { index: 28,
    start: 168502,
    end: 173089,
    duration: 4587,
    text: 'There are... There are going\nto be some things...' },
  { index: 29,
    start: 173257,
    end: 175925,
    duration: 2668,
    text: 'Things that you\'ll\ncome to learn about me' },
  { index: 30,
    start: 176093,
    end: 177802,
    duration: 1709,
    text: 'in the next few days.' },
  { index: 31,
    start: 177970,
    end: 183307,
    duration: 5337,
    text: 'I just want you to know\nthat no matter how it may look' },
  { index: 32,
    start: 183475,
    end: 186269,
    duration: 2794,
    text: 'I only had you in my heart.' },
  { index: 33,
    start: 192276,
    end: 194485,
    duration: 2209,
    text: 'Goodbye.' },
  { index: 34,
    start: 198949,
    end: 202034,
    duration: 3085,
    text: '[SIRENS APPROACHING]' },
  { index: 35,
    start: 212713,
    end: 232565,
    duration: 19852,
    text: '[♪♪♪]' },
  { index: 36,
    start: 294753,
    end: 296545,
    duration: 1792,
    text: '[COUGHING]' },
  { index: 37,
    start: 313897,
    end: 315898,
    duration: 2001,
    text: 'WOMAN [ON TV]:\n- Money before the panel\nearlier this year.' },
  { index: 38,
    start: 316066,
    end: 317566,
    duration: 1500,
    text: 'SKYLER:\nHappy birthday.' },
  { index: 39,
    start: 317734,
    end: 319902,
    duration: 2168,
    text: 'Oh.' },
  { index: 40,
    start: 320070,
    end: 321320,
    duration: 1250,
    text: 'Look at that.' },
  { index: 41,
    start: 322072,
    end: 324657,
    duration: 2585,
    text: 'That is veggie bacon.' },
  { index: 42,
    start: 324825,
    end: 326575,
    duration: 1750,
    text: 'Believe it or not.\nZero cholesterol' },
  { index: 43,
    start: 326743,
    end: 328661,
    duration: 1918,
    text: 'and you won\'t even\ntaste the difference.' },
  { index: 44,
    start: 328829,
    end: 330079,
    duration: 1250,
    text: 'Mm.' },
  { index: 45,
    start: 330247,
    end: 331747,
    duration: 1500,
    text: 'What time do you think\nyou\'ll be home?' },
  { index: 46,
    start: 331915,
    end: 332957,
    duration: 1042,
    text: 'Same time.' },
  { index: 47,
    start: 333125,
    end: 335584,
    duration: 2459,
    text: 'I don\'t want him\ndicking you around tonight.' },
  { index: 48,
    start: 335752,
    end: 339422,
    duration: 3670,
    text: 'You get paid till 5,\nyou work till 5. No later.' },
  { index: 49,
    start: 339589,
    end: 340965,
    duration: 1376,
    text: 'Aha.' },
  { index: 50,
    start: 341133,
    end: 343259,
    duration: 2126,
    text: 'Hey.' },
  { index: 51,
    start: 343427,
    end: 345511,
    duration: 2084,
    text: 'Hey, happy birthday.\nWell, thank you.' },
  { index: 52,
    start: 345679,
    end: 347596,
    duration: 1917,
    text: 'You\'re late again.' },
  { index: 53,
    start: 347764,
    end: 350349,
    duration: 2585,
    text: 'There was no hot water again.' },
  { index: 54,
    start: 350517,
    end: 352393,
    duration: 1876,
    text: 'SKYLER:\nI have an easy fix\nfor that.' },
  { index: 55,
    start: 352561,
    end: 353894,
    duration: 1333,
    text: 'You wake up early,' },
  { index: 56,
    start: 354062,
    end: 357148,
    duration: 3086,
    text: 'and then you get to be the first\nperson in the shower. Hm.' },
  { index: 57,
    start: 357315,
    end: 359025,
    duration: 1710,
    text: 'WALT JR:\nI have an idea.' },
  { index: 58,
    start: 360986,
    end: 364447,
    duration: 3461,
    text: 'How about buy\na new hot-water heater?' },
  { index: 59,
    start: 364614,
    end: 369201,
    duration: 4587,
    text: 'How\'s that idea?\nFor the million-billionth time.' },
  { index: 60,
    start: 369369,
    end: 371287,
    duration: 1918,
    text: '[COUGHING]' },
  { index: 61,
    start: 371455,
    end: 373164,
    duration: 1709,
    text: 'Did you take your echinacea?' },
  { index: 62,
    start: 373331,
    end: 374373,
    duration: 1042,
    text: 'Yeah.' },
  { index: 63,
    start: 374541,
    end: 376459,
    duration: 1918,
    text: 'I think it\'s getting better.' },
  { index: 64,
    start: 376626,
    end: 379128,
    duration: 2502,
    text: 'What the hell is this?' },
  { index: 65,
    start: 379296,
    end: 380504,
    duration: 1208,
    text: 'SKYLER: Hey.\nIt\'s veggie bacon.' },
  { index: 66,
    start: 380672,
    end: 383632,
    duration: 2960,
    text: 'We\'re watching our cholesterol,\nI guess.' },
  { index: 67,
    start: 383800,
    end: 387470,
    duration: 3670,
    text: 'Not me. I want real bacon.\nNot this fake crap.' },
  { index: 68,
    start: 387637,
    end: 389305,
    duration: 1668,
    text: 'Too bad. Eat it.' },
  { index: 69,
    start: 389473,
    end: 392975,
    duration: 3502,
    text: 'Phew.\nThis smells like Band-Aids.' },
  { index: 70,
    start: 393143,
    end: 395019,
    duration: 1876,
    text: 'Eat it.' },
  { index: 71,
    start: 397147,
    end: 399440,
    duration: 2293,
    text: '[SIGHS]' },
  { index: 72,
    start: 399608,
    end: 402359,
    duration: 2751,
    text: 'So how does it feel to be old?' },
  { index: 73,
    start: 402527,
    end: 404320,
    duration: 1793,
    text: 'How does it feel\nto be a smart-ass?' },
  { index: 74,
    start: 404488,
    end: 406989,
    duration: 2501,
    text: 'Heh. Good.' },
  { index: 75,
    start: 408450,
    end: 410242,
    duration: 1792,
    text: 'Eat your veggie bacon.' },
  { index: 76,
    start: 429137,
    end: 430930,
    duration: 1793,
    text: 'WALT: You\'re all set?\nYeah, I\'m fine.' },
  { index: 77,
    start: 431098,
    end: 433432,
    duration: 2334,
    text: 'All right, see you at home.\nOkay, see you.' },
  { index: 78,
    start: 433600,
    end: 434975,
    duration: 1375,
    text: '[SCHOOL BELL RINGS]' },
  { index: 79,
    start: 437646,
    end: 439438,
    duration: 1792,
    text: 'Chemistry.' },
  { index: 80,
    start: 439606,
    end: 442399,
    duration: 2793,
    text: 'It is the study of what?' },
  { index: 81,
    start: 443610,
    end: 445152,
    duration: 1542,
    text: 'Anyone?' },
  { index: 82,
    start: 446530,
    end: 448906,
    duration: 2376,
    text: 'Ben.\nChemicals.' },
  { index: 83,
    start: 449074,
    end: 450866,
    duration: 1792,
    text: 'Chemicals.' },
  { index: 84,
    start: 451034,
    end: 453452,
    duration: 2418,
    text: 'No.' },
  { index: 85,
    start: 453620,
    end: 456080,
    duration: 2460,
    text: 'Chemistry is...' },
  { index: 86,
    start: 456248,
    end: 461460,
    duration: 5212,
    text: 'Well, technically, chemistry\nis the study of matter.' },
  { index: 87,
    start: 461628,
    end: 464755,
    duration: 3127,
    text: 'But I prefer to see it\nas the study of change.' },
  { index: 88,
    start: 464923,
    end: 467550,
    duration: 2627,
    text: 'Now, just...\nJust think about this.' },
  { index: 89,
    start: 467717,
    end: 469301,
    duration: 1584,
    text: 'Electrons.' },
  { index: 90,
    start: 469469,
    end: 471554,
    duration: 2085,
    text: 'They' },
  { index: 91,
    start: 471721,
    end: 473222,
    duration: 1501,
    text: 'change their energy levels.' },
  { index: 92,
    start: 473390,
    end: 475266,
    duration: 1876,
    text: 'Molecules.' },
  { index: 93,
    start: 475433,
    end: 478686,
    duration: 3253,
    text: 'Molecules change their bonds.' },
  { index: 94,
    start: 478854,
    end: 483607,
    duration: 4753,
    text: 'Elements. They combine\nand change into compounds.' },
  { index: 95,
    start: 483775,
    end: 486443,
    duration: 2668,
    text: 'Well, that\'s...\nThat\'s all of life, right?' },
  { index: 96,
    start: 486611,
    end: 489238,
    duration: 2627,
    text: 'I mean, it\'s just...\nIt\'s the constant, it\'s the cycle.' },
  { index: 97,
    start: 489406,
    end: 494243,
    duration: 4837,
    text: 'It\'s solution, dissolution,\njust over and over and over.' },
  { index: 98,
    start: 494411,
    end: 496829,
    duration: 2418,
    text: 'It is growth, then decay,' },
  { index: 99,
    start: 496997,
    end: 499373,
    duration: 2376,
    text: 'then transformation.' }
]

interface TextPlayerState {
    timer?: number
    duration?: number,
    captions?: any,
    index?: number
}

let TIMERID : any;
export default class TextPlayer extends Component<null, TextPlayerState> {
    constructor() {
        super();
        
        this.state = {
            timer: 0,
            duration: 499373,
            captions: textData,
            index:0
        }
    }
    
    componentDidMount() {
      const self = this;

       TIMERID = setInterval(() => {

         self.setState({
            timer : self.state.timer + 1000
         }, () => {
             
             self.setCaption()
            
        })
            if(self.state.timer >= self.state.duration) {
                 clearInterval(TIMERID)
             }
        }, 1000);


    }

    setCaption(){
        
        this.state.captions.forEach((element:any, index:any, array:any) => {
            if(this.state.timer >= element.start && this.state.timer <= element.end ){
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
            <Text>{ this.state.captions[this.state.index].text }</Text>
        </View>
        )
    }
}