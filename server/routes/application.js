import config from 'config';

// pass the necessary config down to the client
// this makes it easy to manage stuff like mocking api urls
// configurable via NODE_ENV
const clientConfig = {
  endpoints: config.get('endpoints'),
};

export default function (app) {
  app.get('*', (req, res) => {
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
