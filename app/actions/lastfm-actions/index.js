require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'
import * as types from '../../constants/ActionTypes.js'
import { handleErrors, handleServerErrors } from '../../utils/handleErrors'

export function fetchLastFmData(actions, params) {
  return {
    actions,
    promise: {
      url: 'http://ws.audioscrobbler.com/2.0/',
      headers: {},
      params: {
        api_key: '57ee3318536b23ee81d6b27e36997cde',
        format : 'json',
        ...params
      },
      mode: 'cors',
    },
  }
};

