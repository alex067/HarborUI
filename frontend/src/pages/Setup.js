import React from 'react'
import RegisterForm from '../components/forms/RegisterForm';

export default function Setup(props) {
    console.log()
    return (
        <section className="setup">
            <div className="setup--wrapper">
                <div className="setup-header">
                    <h2 className="setup-header__title">New Account Setup.</h2>
                    <p className="setup-header__subtitle mt-sm">Register an account to start <strong>scheudling</strong>, 
                    <strong>monitoring</strong>, and <strong>automating</strong> daily tasks.Your initial account will be assigned the role of an <strong>administrator</strong>, 
                    with superuser privilages.</p>
                </div>
                <RegisterForm onSetupChange={props.onSetupChange} setup={true}>
                </RegisterForm>
            </div>
  
        </section>
    )
}
