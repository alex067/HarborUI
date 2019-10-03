import React, { Component } from 'react';
import {connect} from 'react-redux';

import RegisterForm from '../components/forms/RegisterForm';

class Login extends Component {
    constructor(props){
        super(props)
    }
    renderContent(){
        if(this.props.user){
            if(this.props.user.users.length == 0){
                return(
                    <RegisterForm></RegisterForm>
                )
            }
        }
    }   
    render() {
        return (
            <section className="login">
                <div className="container" >
                    <div className="login-body">
                        {this.renderContent()}
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