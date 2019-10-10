import React, { Component } from 'react';
import {connect} from 'react-redux';

import RegisterForm from '../components/forms/RegisterForm';

class Login extends Component {
    constructor(props){
        super(props)
    }
  
    render() {
        return (
            <section className="login">
                <div className="container" >
                    <div className="login-body">
                      login page
                    </div>
                </div>
            </section>
        )
    }
}


function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Login)