import React, { Component } from 'react';

import './Menu.scss'; 

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = () => {
    }

    resize = () => {
    }

    render() {
        return(
            <nav id={"MenuContainer"}>
                <ul className={"menu"}>
                    <li><a href={"#!"}>Lemmatiseur</a></li>
                    <li><a href={"#!"}>Tagueur</a></li>
                    <li><a href={"#!"}>Mots Clés</a></li>
                    <li><a href={"#!"}>Mot Suivant</a></li>
                </ul>
            </nav>
        );
    }
}