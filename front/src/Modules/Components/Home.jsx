import React, { Component, Fragment } from 'react';

import Carte from './Carte';
import Menu from './Menu';

import './Home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport:{
                height:0, 
                width:0
            },
            selectedMenu:0,
            selectedToolTip:0,
            stateToolTip:[
                [true, <p>Bienvenue sur <span style={{color:"red", fontWeight:"bold"}}>Outilocc</span> ! Je suis <span style={{color:"#f9c759", fontWeight:"bold"}}>Gildàs</span>. Demande moi un service en cliquant sur le menu ou clique sur moi pour commencer la conversation.</p>, 1],[true, <p>lemmatiseur</p>, 5, false],
                [true, <p>Tagueur</p>, 5, false],
                [true, <p>Mots Clés</p>, 5, false],
                [true, <p>Mot Suivant</p>, 5, false],
                [false, "", 6, false],
                [true, <p></p>, 1, false],
            ]
        };
    }

    componentDidMount = () => {
        // Resize behavior
        window.addEventListener("resize", this.resize);
        this.setState({viewport:{
            height:document.body.clientHeight, 
            width:document.body.clientWidth
        }}, () => {
            setTimeout(() => {
                let temp = [...this.state.stateToolTip];
                temp[this.state.selectedToolTip][3] = true
                this.setState({
                    stateToolTip:temp
                });
            }, 1000);
        });
    }

    BaseStateToolTip = () => {
        return [
            [true, <p>Bienvenue sur <span style={{color:"red", fontWeight:"bold"}}>Outilocc</span> ! Je suis <span style={{color:"#f9c759", fontWeight:"bold"}}>Gildàs</span>. Demande moi un service en cliquant sur le menu ou clique sur moi pour commencer la conversation.</p>, 1, false],
            [true, <p>lemmatiseur</p>, 5, false],
            [true, <p>Tagueur</p>, 5, false],
            [true, <p>Mots Clés</p>, 5, false],
            [true, <p>Mot Suivant</p>, 5, false],
            [false, "", 6, false],
            [true, <p>Laisse moi réfléchir un instant ...</p>, 1, false],
        ]
    }

    resize = () => {
        this.setState({viewport:{
            height:document.body.clientHeight, 
            width:document.body.clientWidth
        }});
    }

    changeToolTip = (id) => {
        let temp = this.BaseStateToolTip();
        temp[6][2] = this.state.selectedMenu+1
        this.setState({
            stateToolTip:temp
        }, () => {
            setTimeout(() => {
                let temp = [...this.state.stateToolTip];
                temp[id][3] = true
                this.setState({
                    selectedToolTip:id,
                    stateToolTip:temp
                });
            }, 2000);
        });
    }

    changeMenu = (menu) => {
        if(menu !== this.state.selectedMenu){
            let temp = this.BaseStateToolTip();
            temp[6][2] = menu+1
            this.setState({
                selectedMenu:menu,
                stateToolTip:temp
            }, () => {
                setTimeout(() => {
                    let temp = [...this.state.stateToolTip];
                    temp[menu+1][3] = true
                    this.setState({
                        stateToolTip:temp,
                        selectedToolTip:menu+1
                    });
                }, 2000);
            });
        }
    }

    render() {
        return(
            <div id={"HomeContainer"} style={
                {
                    width:this.state.viewport.width,
                    height:this.state.viewport.height,
                }
            }>
                <Fragment>
                    <Menu viewport={this.state.viewport} selected={this.state.selectedMenu} changeMenu={this.changeMenu}></Menu>
                    <Carte viewport={this.state.viewport} changeToolTip={this.changeToolTip} selected={this.state.stateToolTip[this.state.selectedToolTip]}></Carte>
                </Fragment>
            </div>
        );
    }
}
