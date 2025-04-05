import React from 'react'

const ChatContainer = (props) => {
  return (
    // Main wrapper with padding and positioning
    <div className="absolute top-10 left-10 text-2xl font-semibold w-full max-w-screen-lg">
      {/* Card container with border */}
      <div className="border-2 border-blue-500 rounded-lg shadow-md bg-white w-full h-[95vh]">
        {/* Flex column layout for responsiveness */}
        <div className="flex flex-col w-full h-full">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
