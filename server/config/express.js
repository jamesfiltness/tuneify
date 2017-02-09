import express from 'express';
import cookieParser from 'cookie-parser';
import application from '../routes/application';

export default function () {
  const app = express();
  app.use(cookieParser());

  // Use https://www.npmjs.com/package/babel-plugin-transform-require-ignore to ignore css imports (CSS modules)
  application(app);

  return app;
}
