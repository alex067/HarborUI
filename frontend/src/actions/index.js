import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    } from './types';

const baseURL = 'http://localhost:5000'


export const registerUser = (payload) => (
    async dispatch => {
        dispatch({
            type: REGISTER_USER_REQUEST
        })
        await fetch(`${baseURL}/api/signup`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(
            res => res.json()
            .then(
                jsonRes => {    
                    console.log(jsonRes)
                    if(jsonRes['status'] === -1){
                        dispatch({type: REGISTER_USER_FAILURE, payload:jsonRes})
                    }
                    else{
                        dispatch({type: REGISTER_USER_SUCCESS, payload:jsonRes})
                    }
                    
                }
            )
        ).catch(err => {
            console.log(err)
            dispatch({type: REGISTER_USER_FAILURE, payload: err})
        })
    }
)


