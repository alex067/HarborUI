import {authService} from '../services'

const authHeader = () => {
    const currentUser = authService.user;

    if(currentUser && currentUser.authToken){
        return{ Authorization: `Bearer ${currentUser.authToken}`};
    }
    return {};
}

export const authHeader;