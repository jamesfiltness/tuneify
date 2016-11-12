import express from 'express';

const mockServer = express();

mockServer.get('*', (req, res) => {
  console.log(req.params);
});


mockServer.listen('2020', () => {
  console.log('Mock server running on port 2020');
});
