import React, {useState, useEffect} from 'react';
import { Form}from 'react-final-form';
import { Field} from 'react-final-form-html5-validation';
import {connect} from 'react-redux';
import {loginUser} from '../../actions';
import { useHistory, useLocation} from "react-router-dom";

import Alert from '../messages/Alert';

const validate = function(values){
    const errors = {}
    // username validation  
    if(!values.username){
        errors.username = "Required"
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

    return errors
}

const LoginForm = (props) =>{
    // error is a based name, should be alert instead
    const [error, setError] = useState({status: false, message: '', severity: 0})
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/dashboard" } };
    
    useEffect( ()=> {
        const {status, message} = props.loginStatus;
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
                    setError({status: true, message: "Successfully logged in! Redirecting to dashboard...", severity: 200})
                    window.scrollTo(0,0);
                    setInterval( () => {
                        history.push(from)
                    }, 2000)
                    break;
            }
            window.scrollTo(0,0);
        }
       
    }, [props.loginStatus]);

    const onSubmit = (values) => {
        props.loginUser(values)
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
                        <form onSubmit={handleSubmit} className="form-main mt-md">
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
                            <div className={"form-main-container mt-md"}>
                                <button type="button" value="Reset" name="Reset" className="btn btn-secondary mr-sm" disabled={submitting || pristine } onClick={form.reset}>Reset</button>
                                <button type="submit" value="Submit" name="Login" className="btn btn-primary" disabled={submitting}>Login</button>
                            </div>
                        </form>
                    )}
                    >
            </Form>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        loginStatus: state.user.login
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: userInfo => dispatch(loginUser(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);