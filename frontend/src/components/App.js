import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom"
import {connect} from 'react-redux';

import Header from './Header';
import Login from '../pages/Login';
import RegisterForm from '../components/forms/RegisterForm';
import Dashboard from './Dashboard';

import * as actions from '../actions'

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            setupFlag : false
        }
    }
    componentDidMount(){
        
        console.log(this.props.user)
      
    }
    renderInitialPage(){
    
        if(this.state.setupFlag){
            return <RegisterForm></RegisterForm>
        }
        return (
            <Router>
                <Route path="/" exact component={Login}></Route>
                <Route path ="/dashboard" exact component={Dashboard}></Route>
            </Router>
        )
    }
    render(){
        return (
            <Fragment>
                <Header></Header>
                {this.renderInitialPage()}
            </Fragment>
        )
    }
    
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(App);