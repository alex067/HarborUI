import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import RegisterForm from '../components/forms/RegisterForm';

function Setup(props) {
    const [finishSetup, setFinishSetup] = useState(false)

    const renderContent = () => {
        if(!finishSetup){
            return(
                <RegisterForm setup={true} finishSetup={() => {setFinishSetup(true)}}>
                </RegisterForm>
            )
        }
        props.history.push('/');
    }

    return (
        <section className="setup">
            <div className="wrapper">
                <div className="setup-header">
                    <h2 className="setup-header__title">New Account Setup.</h2>
                    <p className="setup-header__subtitle mt-sm">Register an account to start <strong>scheudling</strong>, 
                    <strong>monitoring</strong>, and <strong>automating</strong> daily tasks.Your initial account will be assigned the role of an <strong>administrator</strong>, 
                    with superuser privilages.</p>
                </div>
                {renderContent()}
              
            </div>
  
        </section>
    )
}

export default withRouter(Setup);