import { REGISTER_USER_REQUEST, 
        REGISTER_USER_SUCCESS, 
        REGISTER_USER_FAILURE } from '../actions/types'

const initialState={
    registration:{
        status: 'pending',
        message: ''
    },
    user:{
        user_id: false,
        username: false,
        roletype: false
    }
}

export default function(state = initialState, action){
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return state

        case REGISTER_USER_SUCCESS:
            return {...state, 
                registration: {
                    status: 'success'
                },
                user: {
                    user_id: action.payload.id,
                    username: action.payload.username,
                    roletype: action.payload.roletype
                }
            }
        case REGISTER_USER_FAILURE:
            return {...state, registration: {
                status: 'failure',
                message: action.payload
            }}

        default:
            return state;
    }
}