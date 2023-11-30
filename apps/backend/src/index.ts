import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { initRoutes } from './routes';

const { PORT } = process.env;
const port = PORT ?? 8081;

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
const server = createServer(app);
const io = new Server(server);

initRoutes(app);

server.listen(port, () => {
    console.log(`betterjams server listening on port ${port}`);
});
