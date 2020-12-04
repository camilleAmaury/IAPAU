import React, { Component, Fragment } from 'react';

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
            isLoaded:false
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
        
        return [width_card, height_card, width_gildas, height_gildas, top_gildas, left_gildas, width_flower, height_flower, top_flower, left_flower];
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
                    <div id={"GildasContainer"} style={
                        {
                            width:width_gildas,
                            height:height_gildas,
                            backgroundImage:`url(${gildas})`,
                            backgroundSize:`${width_gildas}px ${height_gildas}px`,
                            top:`${top_gildas}px`,
                            left:`${left_gildas}px`
                        }
                    }></div>
                    <div id={"FlowerContainer"} style={
                        {
                            width:width_flower,
                            height:height_flower,
                            backgroundImage:`url(${flower})`,
                            backgroundSize:`${width_flower}px ${height_flower}px`,
                            top:`${top_flower}px`,
                            left:`${left_flower}px`
                        }
                    }></div>
                </Fragment>
            </div>
        );
    }
}
