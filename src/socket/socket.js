import { Server } from "socket.io";

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // React frontend URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
    });

    socket.on("sendMessage", (message) => {
      io.to(message.chatId).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default setupSocket;
