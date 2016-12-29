import * as types from '../../constants/ActionTypes.js'

export function loggedIn() {
  return {
    type: types.LOGGED_IN,
  }
};

export function loggedOut() {
  return {
    type: types.LOGGED_OUT,
  }
};
