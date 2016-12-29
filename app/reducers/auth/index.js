import * as types from '../../constants/ActionTypes.js';

export function authenticated(state = false, action) {
  switch (action.type) {
    case types.LOGGED_IN:
      return true;
    case types.LOGGED_OUT: 
      return false;
    default: 
      return state
  }    
}
