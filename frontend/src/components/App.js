import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import {connect} from 'react-redux';

import Header from './Header';
import Login from '../pages/Login';

import * as actions from '../actions'

class App extends React.Component {
    constructor(){
        super()
    }
    componentDidMount(){
        this.props.fetchUser();
    }
    render(){
        return (
            <Fragment>
                <Header></Header>
                <Router>
                    <Route path="/" exact component={Login}></Route>
                </Router>
            </Fragment>
        )
    }
    
}

export default connect(null, actions)(App);