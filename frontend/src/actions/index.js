import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    CHECK_SETUP
    } from './types';

const baseURL = 'http://localhost:5000'

export const checkSetup = payload => (
    async dispatch => {
        await fetch(`${baseURL}/api/users`, {
            method: 'GET'
        })
        .then(
            res=> res.json()
            .then(
                jsonRes => {
                    if(jsonRes['status'] === 'error'){
                        dispatch({type: CHECK_SETUP, payload: true})
                    }
                    else{
                        dispatch({type: CHECK_SETUP_FAILURE, payload: false})
                    }
                }
            )
        )
    }
)

export const registerUser = (payload) => (
    async dispatch => {
        dispatch({
            type: REGISTER_USER_REQUEST
        })
        await fetch(`${baseURL}/auth/signup`, {
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
                    if(jsonRes['status'] === 'error'){
                        dispatch({type: REGISTER_USER_FAILURE, payload:jsonRes['error']})
                    }
                    else{
                        dispatch({type: REGISTER_USER_SUCCESS, payload:jsonRes})
                    }
                }
            )
        ).catch(err => {
            dispatch({type: REGISTER_USER_FAILURE, payload: err})
        })
    }
)

export const loginUser = payload => (
    async dispatch => {
        dispatch({
            type: LOGIN_USER_REQUEST
        })

        await fetch(`${baseURL}/auth/login`, {
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
                    if(jsonRes['status'] === 'error'){
                        dispatch({type: LOGIN_USER_FAILURE, payload:jsonRes['error']})
                    }
                    else{
                        localStorage.setItem('access_token', jsonRes.user.token)
                        localStorage.setItem('id_token', jsonRes.user.user_id)
                        dispatch({type: LOGIN_USER_SUCCESS, payload:jsonRes.user})
                    }
                }
            )
            .catch(
                err => {
                    dispatch({type: LOGIN_USER_FAILURE, payload: err})
                }
            )
        )
    }
)

export const logoutUser = () => {
    dispatch=>{
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        dispatch({type: LOGOUT_USER})
    }
}