import {combineReducers} from 'redux';
import userReducer from './userReducer';
import jobReducer from './jobReducer';
import pendingReducer from './pendingReducer';

export default combineReducers({
    user: userReducer,
    jobs: jobReducer,
    request: pendingReducer
})