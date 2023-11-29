import express, { Request, Response } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const { PORT } = process.env;
const port = PORT ?? 8081;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (_: Request, response: Response) => {
  return response.status(200).json({
    message: "betterjams server healthy",
  });
});

server.listen(port, () => {
  console.log(`betterjams server listening on port ${port}`);
});
