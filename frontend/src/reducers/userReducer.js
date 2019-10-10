import { FETCH_USER, CHANGE_USER, REGISTER_USER, SETUP_FLAG, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } from '../actions/types'

const initialState={
    user:{
        user_id: false,
        username: false,
        roletype: false
    }
}

export default function(state = initialState, action){
    switch(action.type){

        case REGISTER_USER_SUCCESS:
            return {...state, 
                user: {
                    user_id: action.payload.id,
                    username: action.payload.username,
                    roletype: action.payload.roletype
                }
            }

        case REGISTER_USER_FAILURE:
            return {...state, initialState}

        default:
            return state;
    }
}