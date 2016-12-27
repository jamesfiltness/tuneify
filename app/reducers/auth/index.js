import * as types from '../../constants/ActionTypes.js';

export function authenticated(state = false, action) {
  switch (action.type) {
    case types.LOGGEDIN:
      return true;
    case types.LOGGEDOUT: 
      return false;
    default: 
      return state
  }    
}

