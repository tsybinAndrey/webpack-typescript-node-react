import express, {Express} from 'express';
import path from 'path';
import webpack, {Configuration, Compiler} from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

function setupFrontendMiddleware(
  app: Express,
  pathToIndex: string,
  webpackConfig: Configuration) {
  if (process.env.NODE_ENV === 'production') {
    app.get('*', (req: express.Request, res: express.Response): void => {
      res.sendFile(pathToIndex);
    });
  } else {
    const compiler: Compiler = webpack({
      ...webpackConfig as Configuration,
    });
  
    const middleware = webpackDevMiddleware(compiler, {
      logLevel: 'trace',
      publicPath: '/',
      stats: 'minimal',
    });
  
    app.use(middleware);
  
    const fs = middleware.fileSystem;
  
    app.get('*', (req: express.Request, res: express.Response): void => {
      fs.readFile(
        path.join(compiler.outputPath, 'index.html'),
        (err: Error|null, file: Buffer): void => {
          if (err) {
            res.sendStatus(404);
          } else {
            res.send(file.toString());
          }
        });
    });
  }
}

export default setupFrontendMiddleware;