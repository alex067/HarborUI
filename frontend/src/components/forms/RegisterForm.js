import React, {Component, Fragment} from 'react'
import { Form}from 'react-final-form'
import { Field} from 'react-final-form-html5-validation';
import {connect} from 'react-redux';
import {registerUser} from '../../actions'

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
    if(!values.fullname){
        errors.fullname ="Required"
    }
    if(values.confirmPassword !== values.password){
        errors.confirmPassword ="Passwords must match"
    }
    return errors
}

class RegisterForm extends Component {
    constructor(props){
        super(props)
    }
    onSubmit(values) {
        this.props.registerUser(values)
        this.props.onSetupChange();
    }
    render(){
        if(this.props.isPending){
            console.log("pendig")
        }
        if(this.props.isSuccess){
            console.log("success")
        }
        return (
            <div className="form">
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
                            <form onSubmit={handleSubmit} className="form-main mt-lg">
                                <div className="form-main-container">
                                    <Field name="username" required maxLength={40}>
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
                                            className={"form-main-field__dropdown" + (this.props.setup ? " setup-flag" : " default")}
                                            defaultValue="admin" >
                                            <option value="admin">Admin</option>
                                            {this.props.setup ? null :     
                                            <Fragment>
                                                <option value="developer">Developer</option>
                                                <option value="editor">Editor</option>
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
}

const mapStateToProps = state => ({
    requestStatus: state.request
})

const mapDispatchToProps = dispatch => ({
    registerUser: userInfo => dispatch(registerUser(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);