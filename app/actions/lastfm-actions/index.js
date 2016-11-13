require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'
import * as types from '../../constants/ActionTypes.js'
import { handleErrors, handleServerErrors } from '../../utils/handleErrors'

export function fetchLastFmData(actions, params) {
  return {
    actions,
    promise: {
      url: window.clientConfig.endpoints.lastfm.url,
      headers: {},
      params: {
        api_key: window.clientConfig.endpoints.lastfm.api_key,
        format : 'json',
        ...params
      },
      mode: 'cors',
    },
  }
};

