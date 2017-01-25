import * as types from '../../constants/ActionTypes.js'
import { combineReducers } from 'redux';

export function modalVisible(state = false, action) {
  switch (action.type) {
    case types.SHOW_MODAL:
      return true;
    case types.HIDE_MODAL:
    case types.PLAYLIST_CREATED:
      return false;
    default: 
      return state
  }    
}

export function modalType(state = null, action) {
  switch (action.type) {
    case types.SHOW_MODAL:
      return action.modalType;
    case types.HIDE_MODAL:
      return null;
    default: 
      return state
  }    
}

export const modal = combineReducers({
  modalVisible,
  modalType,
});
