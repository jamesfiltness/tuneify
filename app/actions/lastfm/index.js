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

