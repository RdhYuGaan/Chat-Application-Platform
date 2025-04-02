import React from 'react'
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatContainer from './ChatContainer';
// import ScrollableFeed from "react-scrollable-feed";


const Chat = ({ user, message, messages, sendMessage }) => {
    return (

        // chat container
        <ChatContainer>
            {/* chat hearder */}
            <ChatHeader user={user} />
            <div
                className="position-relative overflow-auto"
                style={{ height: "calc(100% - 20vh)" }}
            >
                {messages.map((message, index) => {
                    if (message.type === "userStatus") {
                        return (
                            <div key={index} className='text-center'>
                                <span className='bg-info badge'>
                                    {message.userId === user.userId ? "You have Joined!" : `${message.username} has Joined`}
                                </span>
                            </div>
                        );
                    }
                    // return null; // Ensures .map() always returns something
                })}
            </div>
            {/* chat input */}
            <ChatInput message={message} sendMessage={sendMessage} />
        </ChatContainer>
    );
}

export default Chat

