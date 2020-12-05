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
                    <li onClick={() => {this.props.changeMenu(0)}}><a className={this.props.selected === 0 ? "selected" : ""} href={"#!"}>Lemmatiseur</a></li>
                    <li onClick={() => {this.props.changeMenu(1)}}><a className={this.props.selected === 1 ? "selected" : ""} href={"#!"}>Pos-Tag</a></li>
                    <li onClick={() => {this.props.changeMenu(2)}}><a className={this.props.selected === 2 ? "selected" : ""} href={"#!"}>Mots-Clés</a></li>
                    <li onClick={() => {this.props.changeMenu(3)}}><a className={this.props.selected === 3 ? "selected" : ""} href={"#!"}>Mot Suivant</a></li>
                </ul>
            </nav>
        );
    }
}