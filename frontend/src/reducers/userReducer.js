import { REGISTER_USER_REQUEST, 
        REGISTER_USER_SUCCESS, 
        REGISTER_USER_FAILURE,
        LOGIN_USER_REQUEST, 
        LOGIN_USER_SUCCESS, 
        LOGIN_USER_FAILURE,
        LOGOUT_USER } from '../actions/types'

const initialState={
    registration:{
        status: 'pending',
        message: ''
    },
    login:{
        status: 'pending',
        message: ''
    },
    auth:{
        user_id: '',
        username: '',
        roletype: '',
        isAuthenticated: localStorage.getItem('access_token') ? true : false    
    }
}

export default function(state = initialState, action){
    switch(action.type){
        // Register 
        case REGISTER_USER_REQUEST:
            return state

        case REGISTER_USER_SUCCESS:
            return {...state, 
                registration: {
                    status: 'success',
                    message: action.payload.message
                }
            }

        case REGISTER_USER_FAILURE:
            return {...state, registration: {
                status: 'failure',
                message: action.payload
            }}

        // Login
        case LOGIN_USER_REQUEST:
            return state 
        
        case LOGIN_USER_SUCCESS:
            return {
                ...state, 
                login:{
                    status: 'success'
                },
                auth:{
                    user_id: action.payload.user_id,
                    username: action.payload.username,
                    roletype: action.payload.roletype,
                    isAuthenticated: true
                }
            }
        
        case LOGIN_USER_FAILURE:
            return {
                ...state, 
                login:{
                    status: 'failure',
                    message: action.payload
                },
                auth:{
                    user_id: '',
                    username: '',
                    roletype: '',
                    token: '',
                    isAuthenticated: false
                }
            }
        
        // Logout
        case LOGOUT_USER:
            return{
                ...state,
                login:{
                    status:'pending',
                    message: ''
                },
                auth:{
                    user_id: '',
                    username: '',
                    roletype: '',
                    isAuthenticated: false
                }
            }


        default:
            return state;
    }
}