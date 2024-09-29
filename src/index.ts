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
  morador: Morador;
}) => {
  io.to(`user_${notification.morador.id}`).emit(
    "new_notification",
    notification
  );
};

// Handle socket connections
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    socket.join(`user_${userId}`);
  }

  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
});

// This function will be the entry point for Vercel's serverless functions
export default async function handler(req, res) {
  // Initialize your database connection if not already initialized
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized!");
    } catch (err) {
      console.error("Error during Data Source initialization", err);
      return res.status(500).json({ error: "Database connection error" });
    }
  }

  // Handle HTTP requests
  if (req.method === "GET") {
    return res.status(200).json({ message: "Hello from your API!" });
  }

  // You can handle other HTTP methods as needed
  return res.status(405).json({ error: "Method not allowed" });
}
