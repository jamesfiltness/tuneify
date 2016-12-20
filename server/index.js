import config from 'config';
import express from './config/express';

const app = express();

const port = config.get('port');
app.listen(port, () => {
  console.log(`Tuneify running on port ${port}`);
});
