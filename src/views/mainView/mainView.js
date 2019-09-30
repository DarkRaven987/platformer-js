import React from 'react';
import { setGameOn } from '../../game-code/game';

export default class MainView extends React.Component {

    componentDidMount() {
        setGameOn();
    }

    render(){
        return(
            <canvas id="game"/>
        )
    }
}