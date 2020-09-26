
import ActionType from './actionType';

export const setLoadingAction = payload => {
  return {
    type: ActionType.IS_LOADING,
    payload
  }
}

export const addToDO = payload => {
  return {
    type: ActionType.ADD_TODO,
    payload
  }
}

export const removeToDo = payload => {
  return {
    type: ActionType.REMOVE_TODO,
    payload
  }
}

export const markToDO = payload => {
  return {
    type: ActionType.MARK_TODO,
    payload
  }
}

export const unMarkToDO = payload => {
  return {
    type: ActionType.UNMARK_TODO,
    payload
  }
}