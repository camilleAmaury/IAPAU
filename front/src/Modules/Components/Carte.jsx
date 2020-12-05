import React, { Component, Fragment } from 'react';

import InfoBulle from './InfoBulle';

import './Carte.css';

import background from '../../assets/Images/background.png';
import gildas from '../../assets/Images/gildas.png';
import flower from '../../assets/Images/fleur.png';

export default class Carte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardBox:{
                width:1600,
                height:900
            },
            gildasBox:{
                width:500,
                height:525,
                left:140,
                top:325
            },
            flowerBox:{
                width:173,
                height:115,
                left:74,
                top:785
            },
            isLoaded:false,
            gildasHover:false
        };
    }

    componentDidMount = () => {
        this.setState({
            isLoaded:true
        });
    }

    resize = () => {
        // process section
        let temp_width = this.props.viewport.width/1.2;
        let height = temp_width * 9 / 16;
        let temp_height = this.props.viewport.height/1.2;

        // card
        let width_card = temp_width;
        let height_card = height;
        // gildas
        let width_gildas = this.state.gildasBox.width;
        let height_gildas = this.state.gildasBox.height;
        let top_gildas = this.state.gildasBox.top;
        let left_gildas = this.state.gildasBox.left;
        //flower
        let width_flower = this.state.flowerBox.width;
        let height_flower = this.state.flowerBox.height;
        let top_flower = this.state.flowerBox.top;
        let left_flower = this.state.flowerBox.left;
        // if ratio is not respected
        let ratio = temp_width / this.state.cardBox.width;
        if(height > temp_height){
            // card
            height_card = temp_height;
            width_card = height_card * 16 / 9;
            ratio = width_card / this.state.cardBox.width;
        }
        // gildas container
        temp_width = width_gildas * ratio;
        height_gildas *= temp_width / width_gildas;
        width_gildas = temp_width;
        top_gildas *= ratio
        left_gildas *= ratio
        //flower
        temp_width = width_flower * ratio;
        height_flower *= temp_width / width_flower;
        width_flower = temp_width;
        top_flower *= ratio
        left_flower *= ratio
        
        return [width_card, height_card, width_gildas, height_gildas, top_gildas, left_gildas, width_flower, height_flower, top_flower, left_flower, ratio];
    }

    render() {
        // card
        let width_card = 0;
        let height_card = 0;
        // gildas
        let width_gildas = 0;
        let height_gildas = 0;
        let top_gildas = 0;
        let left_gildas = 0;
        //flower
        let width_flower = 0;
        let height_flower = 0;
        let top_flower = 0;
        let left_flower = 0;
        let ratio = 0;

        if(this.state.isLoaded){
            let vars = this.resize();
            // card
            width_card = vars[0];
            height_card = vars[1];
            // gildas
            width_gildas = vars[2];
            height_gildas = vars[3];
            top_gildas= vars[4];
            left_gildas = vars[5];
            //flower
            width_flower = vars[6];
            height_flower = vars[7];
            top_flower = vars[8];
            left_flower = vars[9];
            ratio = vars[10];
        }
        
        return(
            <div id={"CardContainer"} style={
                {
                    width:width_card,
                    height:height_card,
                    backgroundImage:`url(${background})`,
                    backgroundSize:`${width_card}px ${height_card}px`
                }
            }>
                <Fragment>
                    <div id={"GildasHover"} style={
                        {
                            width:250*ratio,
                            height:400*ratio,
                            top:`${top_gildas+105*ratio}px`,
                            left:`${left_gildas+-25}px`,
                            backgroundColor:this.state.gildasHover ? "rgba(211,65,65,0.33)" : "rgba(211,65,65,0)",
                            borderRadius:`${250*ratio}px / ${480*ratio}px`
                        }
                    }></div>
                    <div id={"GildasContainer"} style={
                        {
                            width:width_gildas,
                            height:height_gildas,
                            backgroundImage:`url(${gildas})`,
                            backgroundSize:`${width_gildas}px ${height_gildas}px`,
                            top:`${top_gildas}px`,
                            left:`${left_gildas}px`
                        }
                    }>
                        <div id={"GildasHitBox"} style={
                            {
                                width:200*ratio,
                                height:480*ratio,
                                top:`${45*ratio}px`,
                                left:`${0}px`,
                            }
                        } onClick={() => {this.props.changeToolTip(this.props.selected[2])}} onMouseEnter={() => {this.setState({gildasHover:true})}}
                        onMouseLeave={() => {this.setState({gildasHover:false})}} title={this.props.selectedToolTip <= 4 || this.props.selectedToolTip === 6 ? 
                            "Clique sur moi pour poursuivre l'interaction !":"Appuis sur 'entrée' une fois que tu as écrit ton texte !"}>

                        </div>
                    </div>
                    <InfoBulle isGildas={this.props.selected[0]} ratio={ratio} left={(width_gildas*2/5)+left_gildas} top={top_gildas+(height_gildas*2/5)} 
                        isVisible={this.props.selected[3]} text={this.props.selected[1]} sendRequest={this.props.sendRequest}
                        time_transition_tooltip={this.props.time_transition_tooltip}></InfoBulle>
                    <div id={"FlowerContainer"} style={
                        {
                            width:width_flower,
                            height:height_flower,
                            backgroundImage:`url(${flower})`,
                            backgroundSize:`${width_flower}px ${height_flower}px`,
                            top:`${top_flower}px`,
                            left:`${left_flower}px`
                        }
                    }>
                    </div>
                </Fragment>
            </div>
        );
    }
}
