import {Server} from 'http';
import path from 'path';
import express from 'express';

import frontendMiddleware from './middlewares/frontendMiddleware';
import webpackConfig from '../../webpack/webpack.front.dev';
import { Configuration } from 'webpack';

const runningDir = process.cwd();

const app = express();

frontendMiddleware(
  app,
  path.join(runningDir, 'build/front/index.html'),
  webpackConfig as Configuration,
);

const port: number = Number(process.env.PORT) || 8080;

const server: Server = app.listen(port, () => {
  console.log(`Server started and listening on port:${port}`)
});

function shutdown(): void {
  server.close(() => {
    console.log('Server successfully closed');
  });
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);