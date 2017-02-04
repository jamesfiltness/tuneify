import config from 'config';
import React from 'react';
import createStore from '../../app/redux/create';
import { match, RouterContext } from 'react-router';

const store = createStore(
  // Placeholder data until server app is built
  {
    search: {
      currentSearch: '',
      searching: false,
    },
    autocomplete: {
      autocompleteArtistData : [],
      autocompleteAlbumData : [],
      autocompleteTrackData : [],
    },
    currentVideo: '',
    currentTrackSummaryData: {},
    videoData: [],
    albumPage: {
      albumPageData: null,
      currentAlbumPageError: null,
    },
    artistPage: {
      artistPageData: null,
      currentArtistPageError: null,
    },
    topArtists : {
      topArtistData : null,
      topArtistDataError: null,
    },
    playQueue: {
      playQueueCurrentIndex: 0,
      playQueueTracks: [],
      shuffle: false,
      repeat: false,
    },
  }
);

// pass the necessary config down to the client
// this makes it easy to manage stuff like mocking api urls
// configurable via NODE_ENV
const clientConfig = {
  endpoints : config.get('endpoints')
}

export default function(app) {
  app.get('*', (req, res) => {
        const serverState = store.getState();
        const HTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Tuneify</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel=styleSheet href="/styles.css" type="text/css" />
          </head>
          <body>
            <div id="react-view"></div>
            <script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(serverState)}
              window.clientConfig = ${JSON.stringify(clientConfig)}
            </script>
            <script src="https://apis.google.com/js/api.js"></script>
            <script src="http://cdn.auth0.com/js/lock/10.7.3/lock.min.js"></script>
            <script type="application/javascript" src="/bundle.js"></script>
          </body>
        </html>
        `;
        res.status(200).send(HTML);
    });
}
