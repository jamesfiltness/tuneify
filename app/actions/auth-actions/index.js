import * as types from '../../constants/ActionTypes.js'

export function loggedIn() {
  return {
    type: types.LOGGEDIN,
  }
};

export function loggedOut() {
  return {
    type: types.LOGGEDOUT,
  }
};
