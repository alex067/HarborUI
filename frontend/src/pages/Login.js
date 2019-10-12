import React, {useEffect, useState } from 'react';
import {connect} from 'react-redux';

import RegisterForm from '../components/forms/RegisterForm';

const Login = () => {
    const [setup, setSetup] = useState(false);
    /*
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
*/
    return(
        <div>
            {console.log("login")}
            hi</div>
    )
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Login)