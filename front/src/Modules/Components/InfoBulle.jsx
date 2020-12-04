import React, { Component } from 'react';

//import './InfoBulle.css'; 

import gildaschat from '../../assets/Images/gildaschat.png';
import userchat from '../../assets/Images/userchat.png';

export default class InfoBulle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bulleBoxGildas:{
                width:929,
                height:284,
                Text:{
                    top:130,
                    left:265
                }
            },
            bulleBoxUser:{
                width:756,
                height:232,
                left:173,
                top:52,
                Text:{
                    top:75,
                    left:90
                }
            },
            Text:{
                width:550,
                height:90
            }
        };
    }

    componentDidMount = () => {
    }

    resize = () => {
    }

    render() {
        let width = (this.props.isGildas ? this.state.bulleBoxGildas.width : this.state.bulleBoxUser.width) * this.props.ratio;
        let height = (this.props.isGildas ? this.state.bulleBoxGildas.height : this.state.bulleBoxUser.height) * this.props.ratio;
        let top = this.props.top + (this.props.isGildas ? 0 : (this.state.bulleBoxUser.top * this.props.ratio));
        let left = this.props.left + (this.props.isGildas ? 0 : (this.state.bulleBoxUser.left * this.props.ratio));
        let topText = (this.props.isGildas ? this.state.bulleBoxGildas.Text.top : this.state.bulleBoxUser.Text.top)  * this.props.ratio;
        let leftText = (this.props.isGildas ? this.state.bulleBoxGildas.Text.left : this.state.bulleBoxUser.Text.left)  * this.props.ratio;
        let widthText = this.state.Text.width * this.props.ratio;
        let heightText = this.state.Text.height  * this.props.ratio;
        return(
            <div className={"tooltip"} style={
                {
                    position:"absolute",
                    backgroundImage:`url(${this.props.isGildas ? gildaschat : userchat})`,
                    width:`${width}px`,
                    height:`${height}px`,
                    top:`${top}px`,
                    left:`${left}px`,
                    backgroundSize:`${width}px ${height}px`,
                    opacity : this.props.isVisible ? 1 : 0,
                    transition:`opacity 2s`
                }
            }>
                <div className={"tooltip-text"} style={
                    {
                        position:"absolute",
                        width:`${widthText}px`,
                        height:`${heightText}px`,
                        top:`${topText}px`,
                        left:`${leftText}px`,
                        border:`1px solid black`
                    }
                }>
                    
                </div>  
            </div>
        );
    }
}