import { FETCH_USER, CHANGE_USER, REGISTER_USER } from '../actions/types'

export default function(state = null, action){
    switch(action.type){
        case FETCH_USER:
            return action.payload || false;
        
        case REGISTER_USER:
            return action.payload || false;

        case CHANGE_USER:
            return action.payload
        default:
            return state;
    }
}