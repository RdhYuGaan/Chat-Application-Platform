import React from 'react'
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatContainer from './ChatContainer';
import ScrollableFeed from "react-scrollable-feed";


const Chat = ({ user, message, messages, setMessage, sendMessage }) => {
    return (

        // chat container
        <ChatContainer>
            {/* chat hearder */}
            <ChatHeader user={user} />
            <div
                className="position-relative overflow-auto"
                style={{ height: "calc(100% - 20vh)" }}
            >
                <ScrollableFeed>
                    {messages.map((message, index) => {
                        if (message.type === "userStatus") {
                            return (
                                <div key={index} className='text-center'>
                                    <span className='bg-info badge'>
                                        {message.userId === user.userId
                                            ? "You have Joined!"
                                            : `${message.username} has Joined`}
                                    </span>
                                </div>
                            ) :(
                    <div
                        key={index}
                        style={{
                            marginRight: message.userId === user.userId ? 'auto' : undefined,
                            marginLeft: message.userId !== user.userId ? 'auto' : undefined,
                            display: 'flex',
                            flexDirection: message.userId !== user.userId ? 'row-reverse' : undefined
                        }}
                    >
                        <div>
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                className='rounded-circle mr-1'
                                alt={message.username}
                                width="40"
                                height="40"
                            />
                            <div className='text-muted small text-nowrap mt-2'>
                                12.00 AM
                            </div>
                        </div>
                        <div className='flex-shirink-1 bg-light rounded py-2 px-3 ml-3'>
                            <div className='font-weight-bold mb-1'>
                                {message.userId === user.userId ? "You" : message.username}
                            </div>
                            {message.message}
                        </div>
                        )

                    }
                   
                })}
                </ScrollableFeed>
            </div>
            {/* chat input */}
            <ChatInput
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />
        </ChatContainer>
    );
}

export default Chat

