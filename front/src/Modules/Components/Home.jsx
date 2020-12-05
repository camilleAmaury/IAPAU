import React, { Component, Fragment } from 'react';

import axios from "axios";

import Carte from './Carte';
import Menu from './Menu';

import './Home.css';

import sapin from '../../assets/Images/sapin.png';
import sapin2 from '../../assets/Images/sapin2.png';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport:{
                height:0, 
                width:0
            },
            iconeEcoBox:{
                height:50, 
                width:50,
                heightImage:40,
                widthImage:23
            },
            selectedMenu:0,
            selectedToolTip:0,
            url:[
                "/outiloc/lemmatizer/",
                "/outiloc/postag/",
                "/outiloc/keywords/",
                "/outiloc/next_word/"
            ],
            stateToolTip:[
                [true, <p>Bienvenue sur <span style={{color:"red", fontWeight:"bold"}}>Outilocc</span> ! Je suis <span style={{color:"#f9c759", fontWeight:"bold"}}>Gildàs</span>. Demande moi un service en cliquant sur le menu ou clique sur moi pour commencer la conversation.</p>, 1],[true, <p>lemmatiseur</p>, 5, false],
                [true, <p>Tagueur</p>, 5, false],
                [true, <p>Mots Clés</p>, 5, false],
                [true, <p>Mot Suivant</p>, 5, false],
                [false, "", 6, false],
                [true, <p>Laisse moi réfléchir un instant ...</p>, 1, false],
            ],
            ecomode:false,
            ecoHover:true
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
        ];
    }

    changeEco = () => {
        this.setState({viewport:{
            ecomode:!this.state.ecomode
        }});
    }

    resize = () => {
        this.setState({viewport:{
            height:document.body.clientHeight, 
            width:document.body.clientWidth
        }});
    }

    sendRequest = (event) => {
        if(this.state.selectedToolTip === 5){
            if (event.keyCode === 13) {
                // Cancel the default action, if needed
                event.preventDefault();
                let text = document.getElementById("tooltip-textarea").value;
               axios.get(`http://185.157.246.51:5000${this.state.url[this.state.selectedMenu]}${text}/${this.state.ecomode ? 1 : 0}`, {
                    headers: {
                      'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(request => {
                    if(request.status === 200){
                        setTimeout(() => {
                            let temp = [...this.state.stateToolTip];
                            if(this.state.selectedMenu === 1){
                                let s = "";
                                for(let i = 0; i < request.data.length; i++){
                                    s += request.data[i][1] + " ";
                                }
                                temp[6][1] = <p>{s}</p>;
                            }
                            else if(this.state.selectedMenu === 2){
                                let s = "";
                                for(let i = 0; i < request.data.length; i++){
                                    s += request.data[i] + " ";
                                }
                                temp[6][1] = <p>{s}</p>;
                            }
                            else{
                                temp[6][1] = <p>{request.data}</p>
                            }
                            this.setState({
                                stateToolTip:temp
                            });
                        }, 2000);
                    }
                })
                .catch(error => {
                    //
                    console.log(error);
                });
                // Loading request time
                let temp = this.BaseStateToolTip();
                temp[6][2] = this.state.selectedMenu+1
                this.setState({
                    stateToolTip:temp
                }, () => {
                    setTimeout(() => {
                        let temp = [...this.state.stateToolTip];
                        temp[6][3] = true
                        this.setState({
                            stateToolTip:temp,
                            selectedToolTip:6
                        });
                    }, 2000);
                });
                
            }
        }
    }

    changeToolTip = (id) => {
        if(id !== 6){
            let temp = this.BaseStateToolTip();
            temp[6][2] = this.state.selectedMenu+1;
            if(this.state.selectedToolTip === 6){
                temp[6][1] = this.state.stateToolTip[6][1];
            }
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
                    <div id={"eco-selector"} style={
                        {
                            width:`${this.state.iconeEcoBox.width}px`,
                            height:`${this.state.iconeEcoBox.height}px`,
                            backgroundSize:`${this.state.iconeEcoBox.widthImage}px ${this.state.iconeEcoBox.heightImage}px`,
                            left:`${this.state.viewport.width-this.state.iconeEcoBox.width}px`,
                            top:`${(this.state.viewport.height-this.state.iconeEcoBox.height)/2}px`,
                            backgroundColor:this.state.ecomode ? (this.state.ecoHover ? `#b75959` : `#688d68`) : (this.state.ecoHover ? `#688d68` : `#b75959`)
                        }
                    } onMouseEnter={() => {this.setState({ecoHover:true})}} onMouseLeave={() => {this.setState({ecoHover:false})}}
                    title={"Activer/Désactiver le mode écologique"} onClick={() => {this.setState({ecomode:!this.state.ecomode, ecoHover:!this.state.ecoHover})}}>
                        <div id={"eco-image"} style={
                            {
                                backgroundImage:`url(${this.state.ecomode ? sapin : sapin2})`,
                                width:`${this.state.iconeEcoBox.widthImage}px`,
                                height:`${this.state.iconeEcoBox.heightImage}px`,
                                backgroundSize:`${this.state.iconeEcoBox.widthImage}px ${this.state.iconeEcoBox.heightImage}px`
                            }
                        }></div>
                    </div>
                    <Menu viewport={this.state.viewport} selected={this.state.selectedMenu} changeMenu={this.changeMenu}></Menu>
                    <Carte viewport={this.state.viewport} changeToolTip={this.changeToolTip} selected={this.state.stateToolTip[this.state.selectedToolTip]}
                        sendRequest={this.sendRequest} selectedToolTip={this.state.selectedToolTip}></Carte>
                </Fragment>
            </div>
        );
    }
}
