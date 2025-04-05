import { createServer } from "http"; // Import HTTP module to create the server
import { Server } from "socket.io"; // Import Socket.IO to enable real-time communication
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique user IDs

// Create an HTTP server
const httpServer = createServer();

// Create a new instance of Socket.IO server with CORS configuration
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL for CORS (adjust this if the frontend URL changes)
    methods: ["GET", "POST"], // Allowing GET and POST methods
  },
});

// Middleware for handling user authentication and socket setup
io.use((socket, next) => {
  const username = socket.handshake.auth.username; // Get username from the handshake
  if (!username) {
    return next(new Error("Invalid username")); // Reject the connection if no username is provided
  }

  socket.username = username; // Set the username on the socket object
  socket.userId = uuidv4(); // Generate and assign a unique user ID
  next(); // Proceed to the next middleware or the main connection event
});

// Handle new socket connections
io.on("connection", (socket) => {
  // Create an array to store all connected users
  const users = [];
  io.of("/").sockets.forEach((s) => {
    users.push({
      userId: s.userId,
      username: s.username,
    });
  });

  // Emit the list of connected users to the newly connected user
  socket.emit("users", users);

  // Emit the current user's session details
  socket.emit("session", {
    userId: socket.userId,
    username: socket.username,
  });

  // Notify all other users that a new user has connected
  socket.broadcast.emit("user connected", {
    userId: socket.userId,
    username: socket.username,
  });

  // Handle incoming messages and broadcast them to other users
  socket.on("new message", (message) => {
    socket.broadcast.emit("new message", {
      userId: socket.userId,
      username: socket.username,
      message,
    });
  });
});

// Start the server on the specified port (default to 4000)
httpServer.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port", process.env.PORT || 4000);
});
