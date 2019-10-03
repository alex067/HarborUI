import React, {Component} from 'react'
import { Form, Field } from 'react-final-form'
import {connect} from 'react-redux';
import * as actions from '../../actions'

const validate = function(values){
    const errors = {}
    if(!values.username){
        errors.username = "Required"
    }
    if(!values.password){
        errors.password = "Required" 
    }
    if(!values.confirmPassword){
        errors.confirmPassword = "Required" 
    }
    else if(values.confirmPassword !== values.password){
        errors.confirmPassword ="Passwords must match"
    }
    return errors
}

class RegisterForm extends Component {
    constructor(){
        super()
    }
    onSubmit(values) {
        this.props.registerUser(values['username'], values['password'])
        console.log('register user')
    }
    render(){
        return (
            <div className="form">
                <div className="form--wrapper">
                    <div className="form-header">
                        <h2 className="form-header__title">New Account Setup.</h2>
                        <p className="form-header__subtitle mt-sm">Register an account to start <strong>scheudling</strong>, 
                        <strong>monitoring</strong>, and <strong>automating</strong> daily tasks.</p>
                    </div>
                    <Form
                        onSubmit={this.onSubmit.bind(this)}
                        validate={validate}
                        render={
                            ({
                                handleSubmit,
                                form,
                                submitting,
                                pristine,
                                values
                            }) => (
                                <form onSubmit={handleSubmit} className="form-main">
                                    <div className="form-main-container mt-lg">
                                        <Field name="username">
                                            {({ input, meta }) => (
                                                <div className="form-main-field">
                                                    <input {...input} type="text" placeholder="Username" className="form-main-field__input" required id="registerUsername"></input>
                                                    <div className="form-main-field__error">{meta.error && meta.touched ? meta.error : <span>&nbsp;</span>}</div>
                                                </div>
                                            )}
                                        </Field>
                                    </div>
                                    <div className="form-main-container mt-sm">
                                        <Field name="password">
                                            {({ input, meta }) => (
                                                <div className="form-main-field">
                                                    <input {...input} type="password" placeholder="Password" className="form-main-field__input" required id="registerPassword"></input>
                                                    <div className="form-main-field__error">{meta.error && meta.touched ? meta.error : <span>&nbsp;</span>}</div>
                                                </div>
                                            )}
                                        </Field>
                                        <Field name="confirmPassword">
                                            {({ input, meta }) => (
                                                <div className="form-main-field mt-sm">
                                                    <input {...input} type="password" placeholder="Confirm Password" className="form-main-field__input" required></input>
                                                    <div className="form-main-field__error">{meta.error && meta.touched ? meta.error : <span>&nbsp;</span>}</div>
                                                </div>
                                            )}
                                        </Field>
                                    </div>
                                    <div className="form-main-container mt-sm">
                                        <button type="button" value="Reset" name="Reset" className="btn btn-secondary mr-sm" disabled={submitting || pristine } onClick={form.reset}>Reset</button>
                                        <button type="submit" value="Submit" name="Register" className="btn btn-primary" disabled={submitting}>Register</button>
                                    </div>
                                </form>
                            )}
                            >
                    </Form>
                </div>
            </div>
        )
    }
    
}


export default connect(null, actions)(RegisterForm);