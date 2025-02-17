import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import mainApi from "./routes/mainApi.js";
import setupSocket from "./socket/socket.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", mainApi);

// Create HTTP server
const server = createServer(app);

// Setup WebSocket
setupSocket(server);

// FIX: Use `server.listen()` instead of `app.listen()`
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
