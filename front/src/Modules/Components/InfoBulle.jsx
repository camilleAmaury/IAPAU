import React, { Component, Fragment } from 'react';

import './InfoBulle.css'; 

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
                    top:110,
                    left:245
                }
            },
            bulleBoxUser:{
                width:756,
                height:232,
                left:173,
                top:52,
                Text:{
                    top:55,
                    left:70
                }
            },
            Text:{
                width:590,
                height:130
            }
        };
    }

    componentDidMount = () => {
        
    }
    componentDidUpdate = (prevProps) => {
        if(!this.props.isGildas && document.getElementById("tooltip-textarea") != null) document.getElementById("tooltip-textarea").focus();
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
                    backgroundImage:`url(${this.props.isGildas ? gildaschat : userchat})`,
                    width:`${width}px`,
                    height:`${height}px`,
                    top:`${top}px`,
                    left:`${left}px`,
                    backgroundSize:`${width}px ${height}px`,
                    opacity : this.props.isVisible ? 1 : 0
                }
            }>
                {this.props.isGildas ? 
                    <div className={"tooltip-text"} style={
                        {
                            width:`${widthText}px`,
                            height:`${heightText}px`,
                            top:`${topText}px`,
                            left:`${leftText}px`
                        }
                    }>
                        {this.props.text}
                    </div>  
                :
                    <Fragment>
                        <textarea id={"tooltip-textarea"} className={"tooltip-text"} style={
                            {
                                width:`${widthText}px`,
                                height:`${heightText}px`,
                                top:`${topText}px`,
                                left:`${leftText}px`
                            }
                        }></textarea>
                    </Fragment>
                }
            </div>
    
        );
    }
}