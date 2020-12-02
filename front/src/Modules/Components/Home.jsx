import React, { Component, Fragment } from 'react';
//import { Redirect } from 'react-router';

import './Home.css';

export default class Home extends Component {
    _isMounted = true;

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = () => {
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            <div id={"HomeContainer"}>
                <Fragment>
                    
                </Fragment>
            </div>
        );
    }
}
