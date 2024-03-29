import React, {Fragment, useState, useEffect, useRef} from 'react'
import {withRouter} from 'react-router-dom';
import { Form}from 'react-final-form'
import { Field} from 'react-final-form-html5-validation';
import {connect} from 'react-redux';
import {registerUser} from '../../actions'

import Alert from '../messages/Alert';

const validate = function(values){
    const errors = {}
    // username validation  
    if(!values.username){
        errors.username = "Required"
    }
    else{
        const firstChar = values.username.charAt(0);
        if(!firstChar.match(/[a-z]/i)){
            errors.username="Username must start with a letter"
        }
    }

    // password validation
    if(!values.password){
        errors.password = "Required" 
    }
    if(!values.confirmPassword){
        errors.confirmPassword = "Required" 
    }   
    if(values.confirmPassword !== values.password){
        errors.confirmPassword ="Passwords must match"
    }

    // name validation
    if(!values.fullname){
        errors.fullname ="Required"
    }
    return errors
}

const RegisterForm = (props) =>{
    const [error, setError] = useState({status: false, message: '', severity: 0})
    
    useEffect( ()=> {
        const {status, message} = props.registerStatus;
        // status either fails or succeeds 
        if(status !== "pending"){
            switch(status){
                case "failure":
                    setError({status: true, message, severity: 404})
                    break;
                case "critical":
                    setError({status: true, message, severity: 500})
                    break;
                case "success":
                    setError({status: true, message, severity: 200})
                    window.scrollTo(0,0);
                    setInterval( () => {
                        props.finishSetup()
                    }, 2000)
                    break;
            }
            window.scrollTo(0,0);
        }
       
    }, [props.registerStatus]);

    const onSubmit = (values) => {
        props.registerUser(values)
    }

    return(
        <div className="form">
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={
                    ({
                        handleSubmit,
                        form,
                        submitting,
                        pristine,
                        values
                    }) => (
                        <form onSubmit={handleSubmit} className="form-main mt-lg">
                            {error.status === true ? 
                                <div className="form-errorhandler mb-md">
                                    <Alert message={error.message} severity={error.severity}></Alert>
                                </div>
                                : null
                            }

                            <div className="form-main-container">
                                <Field name="username" required>
                                    {({ input, meta }) => (
                                        <div className="form-main-field">
                                            <input {...input} type="text" placeholder="Username" className="form-main-field__input"></input>
                                            <div className="form-main-field__error">{meta.error && meta.touched ? meta.error : <span>&nbsp;</span>}</div>
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="form-main-container mt-sm">
                                <Field name="password" required>
                                    {({ input, meta }) => (
                                        <div className="form-main-field">
                                            <input {...input} type="password" placeholder="Password" className="form-main-field__input" ></input>
                                            <div className="form-main-field__error">{meta.error && meta.touched ? meta.error : <span>&nbsp;</span>}</div>
                                        </div>
                                    )}
                                </Field>
                                <Field name="confirmPassword" required>
                                    {({ input, meta }) => (
                                        <div className="form-main-field mt-sm">
                                            <input {...input} type="password" placeholder="Confirm Password" className="form-main-field__input" ></input>
                                            <div className="form-main-field__error">{meta.error && meta.touched ? meta.error : <span>&nbsp;</span>}</div>
                                        </div>
                                    )}
                                </Field>
                                <div className="form-main-divider mt-sm">
                                    &nbsp;
                                </div>
                            </div>
                            <div className="form-main-container mt-sm">
                                <Field name="fullname" required maxLength={120}>
                                    {({ input, meta }) => (
                                        <div className="form-main-field">
                                            <input {...input} type="text" placeholder="Full Name" className="form-main-field__input" ></input>
                                            <div className="form-main-field__error">{meta.error && meta.touched ? meta.error : <span>&nbsp;</span>}</div>
                                        </div>
                                    )}
                                </Field>
                                <Field name="email" typeMismatch="Please enter a valid email address" maxLength={120}>
                                    {({ input, meta }) => (
                                        <div className="form-main-field mt-sm">
                                            <input {...input} type="email" placeholder="Email" className="form-main-field__input" ></input>
                                            <div className="form-main-field__error">{meta.error && meta.touched ? meta.error : <span>&nbsp;</span>}</div>
                                        </div>
                                    )}
                                </Field>                                       
                                <div className="form-main-divider mt-sm">
                                    &nbsp;
                                </div>
                            </div>
                            <div className="form-main-container ta-left">
                                <label className="form-main-field__label">Your Role</label>
                                <div className="form-main-field">
                                    <Field name="roletype" 
                                        component="select" 
                                        className={"form-main-field__dropdown" + (props.setup ? " setup-flag" : " default")}
                                        defaultValue="0" >
                                        <option value="0">Super</option>
                                        {props.setup ? null :     
                                        <Fragment>
                                            <option value="1">Admin</option>
                                            <option value="2">Developer</option>
                                            <option value="3">Support</option>
                                        </Fragment>                      
                                        }

                                    </Field>
                                </div>
                            </div>
                            <div className={"form-main-container mt-md"}>
                                <button type="button" value="Reset" name="Reset" className="btn btn-secondary mr-sm" disabled={submitting || pristine } onClick={form.reset}>Reset</button>
                                <button type="submit" value="Submit" name="Register" className="btn btn-primary" disabled={submitting}>Register</button>
                            </div>
                        </form>
                    )}
                    >
            </Form>
        </div>
    )
}

const mapStateToProps = state => ({
    registerStatus: state.user.registration,
    user: state.user.user
})

const mapDispatchToProps = dispatch => ({
    registerUser: userInfo => dispatch(registerUser(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);