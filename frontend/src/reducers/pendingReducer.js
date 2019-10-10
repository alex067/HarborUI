function getActionName(actionType) {
    if (typeof actionType !== 'string') {
      return null;
    }
   
    return actionType
      .split("_")
      .slice(0, -1)
      .join("_");
}

export default function(state = {}, action){
    const actionName = getActionName(action.type);

    if(!actionName){
        return {...state}
    }

    if(action.type.endsWith("_REQUEST")){
        return {
            ...state, [actionName]: {pending: true}
        }
    }

    else if (action.type.endsWith("_SUCCESS") || action.type.endsWith("_FAILURE")){
        return{
            ...state, [actionName]: {pending: false}
        }
    }

    return {...state}
}