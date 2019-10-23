import {Server} from 'http';
import express from 'express';

const app = express();

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