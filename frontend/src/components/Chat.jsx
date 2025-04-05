import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  TextField,
  Button,
  useMediaQuery,
} from "@mui/material";
import ScrollableFeed from "react-scrollable-feed";

const Chat = ({ user, message, messages, setMessage, sendMessage }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Chat Header */}
      <Box
        sx={{
          padding: isMobile ? 1 : 2,
          backgroundColor: "#1976d2",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant={isMobile ? "subtitle1" : "h6"}>
          Welcome, {user.username}
        </Typography>
      </Box>

      {/* Chat Messages Section */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: isMobile ? 1 : 2,
          backgroundColor: "#e8eaf6",
        }}
      >
        <ScrollableFeed>
          {messages.map((message, index) => {
            // Handle join/leave system messages
            if (message.type === "userStatus") {
              return (
                <Typography
                  key={index}
                  variant="body2"
                  align="center"
                  sx={{
                    backgroundColor: "#bbdefb",
                    padding: 1,
                    borderRadius: 1,
                    marginBottom: 1,
                  }}
                >
                  {message.userId === user.userId
                    ? "You have Joined!"
                    : `${message.username} has Joined`}
                </Typography>
              );
            } else {
              const isOwnMessage = message.userId === user.userId;
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: isOwnMessage ? "row-reverse" : "row",
                    alignItems: "flex-start",
                    marginBottom: isMobile ? 1 : 2,
                  }}
                >
                  {/* User Avatar */}
                  <Avatar
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt={message.username}
                    sx={{
                      width: isMobile ? 30 : 40,
                      height: isMobile ? 30 : 40,
                      margin: isOwnMessage ? "0 0 0 8px" : "0 8px 0 0",
                    }}
                  />

                  {/* Message Bubble */}
                  <Paper
                    elevation={3}
                    sx={{
                      padding: isMobile ? 1 : 2,
                      backgroundColor: isOwnMessage ? "#c8e6c9" : "#fff",
                      maxWidth: "70%",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: "bold",
                        fontSize: isMobile ? "0.8rem" : "1rem",
                      }}
                    >
                      {isOwnMessage ? "You" : message.username}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: isMobile ? "0.9rem" : "1rem" }}
                    >
                      {message.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        marginTop: 1,
                        color: "gray",
                        fontSize: isMobile ? "0.7rem" : "0.8rem",
                      }}
                    >
                      12:00 AM {/* Placeholder — you can make this dynamic later */}
                    </Typography>
                  </Paper>
                </Box>
              );
            }
          })}
        </ScrollableFeed>
      </Box>

      {/* Chat Input Field */}
      <Box
        sx={{
          padding: isMobile ? 1 : 2,
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 1 : 2,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            fontSize: isMobile ? "0.9rem" : "1rem",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          sx={{
            height: isMobile ? "48px" : "56px",
            fontSize: isMobile ? "0.8rem" : "1rem",
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
