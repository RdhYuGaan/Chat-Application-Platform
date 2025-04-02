import React, { useState, useEffect } from 'react'
import Login from './Login'
import Chat from './Chat';

 
const Main = ({socket}) => {
    const [newUser, setNewUser] = useState("");
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("users", (users) => {
            const messageArr = [];
            for (const { userId, username } of users) {
                const newMessage = { type: "userStatus", userId, username };
                messageArr.push(newMessage);
            }
            setMessages([...messages, ...messageArr]);
            setUsers(users);


        });
        socket.on("session", ({ userId, username }) => {
            setUser({ userId, username });
        });
        socket.on("user connected", ({ userId, username }) => {
            const newMessage = { type: "userStatus", userId, username };
            setMessages([...messages, newMessage]);
        });
        socket.on("new message", ({ userId, username, message }) => {
            const newMessage = {
                type: "message",
                userId: userId,
                username: user.username,
                message
            };
            setMessages([...messages, newMessage]);
        });
    }, [socket, messages]);


    function handleChange({ currentTarget: input }) {
        setNewUser(input.value);
    }

    function logNewUser() {
        socket.auth = { userName: newUser };
        socket.connect();

    }
    function sendMessage() {
        socket.emit("new message", message);
        const newMessage = {
            type: "message",
            userId: user.userId,
            username: user.username,
            message,
        };
        setMessages([...messages, newMessage]);
        setMessages("");
    }



    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-900">
            {user.userId ? (
                <Chat
                    user={user}
                    message={message}
                    messages={messages}
                    setMessage={setMessage}
                    sendMessage={sendMessage} />
            ) : (
                <Login
                    newUser={newUser}
                    handleChange={handleChange}
                    logNewUser={logNewUser}
                />
            )}
        </div>

    );
}

export default Main
