/*
* This file demonstrates a basic ReactXP app.
*/

import * as RX from 'reactxp'
import SearchSubtitle from "./screens/SearchSubtitle";


interface AppState {}


class App extends RX.Component<null, AppState> {
    constructor() {
        super();
        
        this.state = {

        }


    }

    componentDidMount() {
    }



    render(): JSX.Element | null {
        return (
            <SearchSubtitle />
       );
    }

}

export = App;
