import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Adjust this if your frontend URL changes
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("Invalid username"));
  }

  socket.username = username;
  socket.userId = uuidv4();
  next();
});

io.on("connection", (socket) => {
  // Get all connected users
  const users = [];
  io.of("/").sockets.forEach((s) => {
    users.push({
      userId: s.userId,
      username: s.username,
    });
  });

  // Emit the users' data
  socket.emit("users", users);

  // Emit the connected user's details
  socket.emit("session", {
    userId: socket.userId,
    username: socket.username,
  });

  // Notify all other users that a new user has connected
  socket.broadcast.emit("user connected", {
    userId: socket.userId,
    username: socket.username,
  });

  // Handle new message
  socket.on("new message", (message) => {
    socket.broadcast.emit("new message", {
      userId: socket.userId,
      username: socket.username,
      message,
    });
  });
});

httpServer.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port", process.env.PORT || 4000);
});
code .Errorgit 