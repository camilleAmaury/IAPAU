import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from 'react-helmet'

import Home from './Modules/Components/Home';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title:"Occitan"
    }
  }

  componentDidMount = () => {
  }


  render() {
    return (
      <Fragment>
        <>
          <Helmet>
            <title>{ this.state.title }</title>
          </Helmet>
        </>
        <Router>
          <Switch>
            {/* default route */}
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
