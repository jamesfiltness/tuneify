import config from 'config';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import createStore from '../../app/redux/create';
import { match, RouterContext } from 'react-router';
import routes from '../../app/components/routes';

const store = createStore(
  // Placeholder data until server app is built
  {
    currentSearch: '',
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
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const componentHTML = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        // Get the redux state so that it can be passed down to rehydrate the client
        const serverState = store.getState();
        const HTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Tuneify</title>
            <link rel=styleSheet href="/styles.css" type="text/css" />
          </head>
          <body>
            <div id="react-view">${componentHTML}</div>
            <script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(serverState)}
              window.clientConfig = ${JSON.stringify(clientConfig)}
            </script>
            <script src="https://apis.google.com/js/api.js"></script>
            <script type="application/javascript" src="/bundle.js"></script>
          </body>
        </html>
        `;
        res.status(200).send(HTML);
      } else {
        res.status(404).send('Not found');
      }
    });
  });
}
