const express = require('express');
const mockServer = express();

const artistSearch = require('./fixtures/artist-search.json');
const trackSearch = require('./fixtures/track-search.json');
const albumSearch = require('./fixtures/album-search.json');
const topArtists  = require('./fixtures/top-artists.json');
const albumInfo  = require('./fixtures/album-info.json');
const artistInfo  = require('./fixtures/artist-info.json');

mockServer.use(express.static('images'))

mockServer.use((req, res, next) => {
  // Enable CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mockServer.get('*', (req, res) => {
  if (req.query.api_key === '57ee3318536b23ee81d6b27e36997cde') {
    if (req.query.method === 'artist.search') {
      res.json(artistSearch);
    }
    if (req.query.method === 'track.search') {
      res.json(trackSearch);
    }
    if (req.query.method === 'album.search') {
      res.json(albumSearch);
    }
    if (req.query.method === 'chart.gettopartists') {
      res.json(topArtists);
    }
    if(req.query.method === 'album.getinfo') {
      res.json(albumInfo);
    }
    if (req.query.method === 'artist.getinfo') {
      res.json(artistInfo);
    }
  }
});


mockServer.listen('2020', () => {
  console.log('Mock server running on port 2020');
});
