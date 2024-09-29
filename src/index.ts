import express from "express";
import http from "http";
import { Server } from "socket.io";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { routes } from "./routes";
import { Morador } from "./entity/Morador";

const app = express();
app.use(express.json());
app.use(routes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


export const emitNotification = (notification: {
  mensagem: string;
  data: string;
  id: number;
  morador: Morador
}) => {
  io.to(`user_${notification.morador.id}`).emit(
    "new_notification",
    notification
  );
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    socket.join(`user_${userId}`);
  }

  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
});


AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    server.listen(3000, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
