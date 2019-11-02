import React, {Fragment, useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';

import {PrivateRoute} from './components/PrivateRoute';
import baseURL from './config';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SetupPage from './pages/SetupPage';
import RegisterForm from './components/forms/RegisterForm';
import Dashboard from './components/Dashboard';

function App(props){
    console.log(props.isAuthenticated)
    return(
        <Fragment>
            <Header></Header>
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginPage}></Route>
                    <Route path="/setup" exact component={SetupPage}></Route>
                    <Route path="/register" exact component={RegisterForm}></Route>
                    <PrivateRoute auth={props.isAuthenticated} path ="/dashboard" exact component={Dashboard}></PrivateRoute>
                </Switch>    
            </Router> 
        </Fragment>
    )
}

function mapStateToProps(state){
    return{
        isAuthenticated: state.user.auth.isAuthenticated
    }

}

export default connect(mapStateToProps)(App);