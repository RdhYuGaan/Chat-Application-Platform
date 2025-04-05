import React, { useState, useEffect } from "react";
import Login from "./Login";
import Chat from "./Chat";

const Main = ({ socket }) => {
  // State to manage the new user input, current user, active users, message input, and message history
  const [newUser, setNewUser] = useState("");  // Username input field
  const [user, setUser] = useState({});  // Currently logged-in user
  const [users, setUsers] = useState([]);  // List of users in the chat room
  const [message, setMessage] = useState("");  // Current message being typed
  const [messages, setMessages] = useState([]);  // Message history (chat feed)

  useEffect(() => {
    // Listens for the updated list of users
    socket.on("users", (users) => {
      // Maps the users into status messages (like "User1 has joined")
      const messageArr = users.map(({ userId, username }) => ({
        type: "userStatus",  // Custom message type
        userId,
        username,
      }));
      // Updates the message history by adding the user status messages
      setMessages((prev) => [...prev, ...messageArr]);
      setUsers(users);  // Updates the list of users
    });

    // Handles session: when a user is logged in
    socket.on("session", ({ userId, username }) => {
      setUser({ userId, username });  // Sets the user object
    });

    // Handles when a user connects to the chat
    socket.on("user connected", ({ userId, username }) => {
      const newMessage = { type: "userStatus", userId, username };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Handles new incoming messages
    socket.on("new message", ({ userId, username, message }) => {
      const newMessage = {
        type: "message",
        userId: userId,
        username,
        message,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);  // Adds the new message to the message history
    });

    // Cleanup the socket listeners on component unmount
    return () => {
      socket.off("users");
      socket.off("session");
      socket.off("user connected");
      socket.off("new message");
    };
  }, [socket]);  // The effect runs when the socket is updated

  // Handle change in the input field (for new username)
  const handleChange = ({ currentTarget: input }) => {
    setNewUser(input.value);
  };

  // Handles user login by setting socket auth and connecting
  const logNewUser = () => {
    socket.auth = { username: newUser };
    socket.connect();
  };

  // Send the current message to the server
  const sendMessage = () => {
    if (!message.trim()) return; // Prevent empty messages from being sent
    socket.emit("new message", message);  // Emit the message to the server
    const newMessage = {
      type: "message",
      userId: user.userId,
      username: user.username,
      message,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);  // Add the message to message history
    setMessage("");  // Clear the input field after sending the message
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      {/* If the user is logged in, show the Chat component, else show the Login component */}
      {user.userId ? (
        <Chat
          user={user}
          message={message}
          messages={messages}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      ) : (
        <Login newUser={newUser} handleChange={handleChange} logNewUser={logNewUser} />
      )}
    </div>
  );
};

export default Main;
