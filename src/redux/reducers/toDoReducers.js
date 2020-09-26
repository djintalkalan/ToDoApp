import ActionTypes from '../actions/actionType'

let initState = []
export const isLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case ActionTypes.IS_LOADING:
            return action.payload
        default:
            return state
    }
}

export const toDoReducer = (state = initState, action) => {
    let newState = [...state];
    switch (action.type) {
        case ActionTypes.ADD_TODO:
            return [...newState, action.payload]
        case ActionTypes.REMOVE_TODO:
            newState.splice(action.payload, 1);
            return newState;
        case ActionTypes.MARK_TODO:
            newState[action.payload].marked = true;
            return newState;
        case ActionTypes.UNMARK_TODO:
            newState[action.payload].marked = false;
            return newState;
        default:
            return state
    }
}


