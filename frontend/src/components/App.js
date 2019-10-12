import React, {Fragment, useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";

import baseURL from '../config';
import Header from './Header';
import Login from '../pages/Login';
import Setup from '../pages/Setup';
import RegisterForm from '../components/forms/RegisterForm';
import Dashboard from './Dashboard';

function App(){
    const [setup, setSetup] = useState(false);
    const [dataFlag, setDataflag] = useState(false);
    
    useEffect( () => {
        async function checkSetup() {
            const res = await fetch(`${baseURL}/api/users`, {
                mehtod: 'GET'      
            })
            res.json().then( data => {
                    data.users.length === 0 ?  setSetup(true) : setSetup(false);
                }
            )
        }
        checkSetup();
        
    }, []);

    const handleSetup = () => {
        // handles initial set up render 
        // make sure routes don't get rendered 
        setDataflag(true)
        setSetup(false)
    }

    return(
        <Fragment>
            <Header></Header>
            {console.log(dataFlag, setup)}
            {!setup && dataFlag ? 
                <Router>
                    <Route path="/" exact component={Login}></Route>
                    <Route path="/register" exact component={RegisterForm}></Route>
                    <Route path ="/dashboard" exact component={Dashboard}></Route>
                </Router>  :
                <Setup onSetupChange={handleSetup}></Setup>
            }
        </Fragment>
    )
}

export default App;