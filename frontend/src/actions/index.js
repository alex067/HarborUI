import {FETCH_USER, SETUP_FLAG, REGISTER_USER} from './types';

const baseURL = 'http://localhost:5000'

export const checkSetup = () => (
    async dispatch => {
        const res = await fetch(`${baseURL}/api/users`, {
            mehtod: 'GET'      
        })
        res.json().then( data => {
            dispatch({type: SETUP_FLAG, payload:data})
        })
    }
)


