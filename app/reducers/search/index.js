import * as types from '../../constants/ActionTypes.js';

export function currentSearch(state = '' , action) {
  switch (action.type) {
    case types.REQUEST_DATA:
      return  action.searchTerm
    case types.CLEAR_SEARCH:
      return  null;
    default: 
      return state
  }    
}
