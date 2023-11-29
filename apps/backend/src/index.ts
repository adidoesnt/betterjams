import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { initRoutes } from './routes';

const { PORT } = process.env;
const port = PORT ?? 8081;

const app = express();
const server = createServer(app);
const io = new Server(server);

initRoutes(app);

server.listen(port, () => {
    console.log(`betterjams server listening on port ${port}`);
});
