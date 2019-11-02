import React, {Fragment, useState, useEffect} from 'react';
import {Redirect} from 'react-router';
import LoginForm from '../components/forms/LoginForm';
import baseURL from '../config';

const Login = (props) => {
    const [setup, setSetup] = useState(false)
    const [dataFlag, setDataflag] = useState(false)

    useEffect( () => {
       const abortController = new AbortController();

        async function checkSetup() {
            const res = await fetch(`${baseURL}/api/users`, {
                mehtod: 'GET',
            })
            res.json().then( data => {
                console.log(data)
                if(data.status === 'error'){
                    setSetup(true)
                }
                else{
                    setSetup(false)
                }
                setDataflag(true)
                }
            )
        }
        
        checkSetup();
        
        return () => abortController.abort();
      
    }, []);

    const renderContent = () => {
        if(dataFlag){
            if(setup){
                return <Redirect to="/setup"></Redirect>
            }
            return(
                <section className="login">
                    <div className="wrapper">
                        <div className="login-header ">
                            <h2 className="login-header__title mb-md">Login.</h2>
                        </div>
                        <LoginForm></LoginForm>
                    </div>
                </section>
            )
        }
        return null
       
    }
    return(
        <Fragment>
             {renderContent()}
        </Fragment>
       
    )
   
}

export default Login;
