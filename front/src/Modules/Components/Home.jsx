import React, { Component, Fragment } from 'react';

import Carte from './Carte';

import './Home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport:{
                height:0, 
                width:0
            }
        };
    }

    componentDidMount = () => {
        // Resize behavior
        window.addEventListener("resize", this.resize);
        this.setState({viewport:{
            height:document.body.clientHeight, 
            width:document.body.clientWidth
        }});
    }

    resize = () => {
        this.setState({viewport:{
            height:document.body.clientHeight, 
            width:document.body.clientWidth
        }});
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
                    <Carte viewport={this.state.viewport}></Carte>
                </Fragment>
            </div>
        );
    }
}
