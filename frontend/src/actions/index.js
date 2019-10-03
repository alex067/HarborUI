import {FETCH_USER, CHANGE_USER, FETCH_JOBS} from './types';
import Api from '../api';

export const fetchUser = () => (
    async dispatch => {
        const res = await Api.get('/api/users')
        dispatch({type: FETCH_USER, payload:res.data})
    }
)

export const registerUser = (username, password) => (
    async dispatch => {
        const res = await Api.post('/signup', {
            username: username,
            password: password
        })
        dispatch({type: FETCH_USER, payload: res.data})
    }
)

