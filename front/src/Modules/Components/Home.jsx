import React, { Component, Fragment } from 'react';

import axios from "axios";

import Carte from './Carte';
import Menu from './Menu';

import './Home.scss';

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
                width:150,
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
                [true, <p>Bienvenue sur <span style={{color:"red", fontWeight:"bold"}}>Outilocc</span> ! Je suis <span style={{color:"#f9c759", fontWeight:"bold"}}>Gildàs</span>. Demandez moi un service en cliquant sur le menu ou cliquez sur moi pour commencer la conversation.</p>, 1],
                [true, <p>Permettez moi de vous aider à lemmatiser une phrase. C'est à dire remplacer toutes les formes fléchies en leur lemme, <span style={{fontWeight:"bold"}}>en cliquant sur moi</span> !</p>, 5, false],
                [true, <p>Je peux effectuer une classification, en partie, du langage. <span style={{fontWeight:"bold"}}>Cliquez sur moi</span> et saisissez votre phrase !</p>, 5, false],
                [true, <p>Je suis capable de trouver les mots les 3 mots les plus importants de votre phrase, <span style={{fontWeight:"bold"}}>cliquez sur moi</span> !</p>, 5, false],
                [true, <p>Je vois dans le futur ! <span style={{fontWeight:"bold"}}>Cliquez sur moi</span> et je prédirais le prochain mot de votre phrase.</p>, 5, false],
                [false, "", 6, false],
                [true, <p>Laisse moi réfléchir un instant ...</p>, 1, false],
            ],
            ecomode:false,
            ecoHover:false,
            time_transition_tooltip:1000
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
            [true, <p>Bienvenue sur <span style={{color:"red", fontWeight:"bold"}}>Outilocc</span> ! Je suis <span style={{color:"#f9c759", fontWeight:"bold"}}>Gildàs</span>. Demandez moi un service en cliquant sur le menu ou cliquez sur moi pour commencer la conversation.</p>, 1],
            [true, <p>Permettez moi de vous aider à lemmatiser une phrase. C'est à dire remplacer toutes les formes fléchies en leur lemme, <span style={{fontWeight:"bold"}}>en cliquant sur moi</span> !</p>, 5, false],
            [true, <p>Je peux effectuer une classification, en partie, du langage. <span style={{fontWeight:"bold"}}>Cliquez sur moi</span> et saisissez votre phrase !</p>, 5, false],
            [true, <p>Je suis capable de trouver les mots les 3 mots les plus importants de votre phrase, <span style={{fontWeight:"bold"}}>cliquez sur moi</span> !</p>, 5, false],
            [true, <p>Je vois dans le futur ! <span style={{fontWeight:"bold"}}>Cliquez sur moi</span> et je prédirais le prochain mot de votre phrase.</p>, 5, false],
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
            if(this.state.selectedMenu !== 3){
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
                                let old = <Fragment><span style={{fontStyle: "italic"}}>{text}</span><br/><br/></Fragment>;
                                if(this.state.selectedMenu === 0){
                                    let s=[];
                                    for(let i = 0; i < request.data.length; i++){
                                        s.push(<Fragment key={i}><span className={"word"} title={Math.round(request.data[i][1]*10000)/100 + "% de confiance" }>{request.data[i][0]}</span>&nbsp;</Fragment>);
                                    }
                                    temp[6][1] = <p>{old} {s}</p>;
                                }
                                else if(this.state.selectedMenu === 1){
                                    let s=[];
                                    for(let i = 0; i < request.data.length; i++){
                                        s.push(<Fragment key={i}><span className={"word"} title={request.data[i][1] + " | " + Math.round(request.data[i][2]*10000)/100 + "% de confiance" }>{request.data[i][0]}</span>&nbsp;</Fragment>);
                                    }
                                    temp[6][1] = <p>{s}</p>;
                                }
                                else if(this.state.selectedMenu === 2){
                                    let s=[];
                                    for(let i = 0; i < request.data.length; i++){
                                        s.push(<Fragment key={i}><span style={{fontWeight: "bold"}}>{request.data[i]}</span>,&nbsp;</Fragment>);
                                    }
                                    temp[6][1] = <p>{old} {s}</p>;
                                }
                                this.setState({
                                    stateToolTip:temp
                                });
                            }, this.state.time_transition_tooltip);
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
                        }, this.state.time_transition_tooltip);
                    });
                    
                }
            }else{
                if (event.keyCode === 9) {
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
                            document.getElementById("tooltip-textarea").value = text + " " + request.data;
                        }
                    })
                    .catch(error => {
                        //
                        console.log(error);
                    });
                    
                }
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
                    }, this.state.time_transition_tooltip);
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
                            backgroundColor:this.state.ecomode ? (this.state.ecoHover ? `#b75959` : `#688d68`) : (this.state.ecoHover ? `#688d68` : `#b75959`),
                            color:!this.state.ecoHover ? `rgb(236, 236, 236)` : `black`
                        }
                    } onMouseEnter={() => {this.setState({ecoHover:true})}} onMouseLeave={() => {this.setState({ecoHover:false})}}
                    title={"Activer/Désactiver le mode écologique"} onClick={() => {this.setState({ecomode:!this.state.ecomode, ecoHover:false})}}>
                        <div id={"eco-image"} style={
                            {
                                backgroundImage:`url(${this.state.ecomode ? sapin : sapin2})`,
                                marginRight:`10px`,
                                width:`${this.state.iconeEcoBox.widthImage}px`,
                                height:`${this.state.iconeEcoBox.heightImage}px`,
                                backgroundSize:`${this.state.iconeEcoBox.widthImage}px ${this.state.iconeEcoBox.heightImage}px`
                            }
                        }></div>
                        <div>{this.state.ecomode? "Désactiver" : "Activer"} <br/>Mode éco</div>
                    </div>
                    <Menu viewport={this.state.viewport} selected={this.state.selectedMenu} changeMenu={this.changeMenu}></Menu>
                    <Carte viewport={this.state.viewport} changeToolTip={this.changeToolTip} selected={this.state.stateToolTip[this.state.selectedToolTip]}
                        sendRequest={this.sendRequest} selectedToolTip={this.state.selectedToolTip} time_transition_tooltip={this.state.time_transition_tooltip}></Carte>
                </Fragment>
            </div>
        );
    }
}
