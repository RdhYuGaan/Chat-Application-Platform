import React from "react";
const ChatInput = ({ message, sendMessage, setMessage }) => {
  
  return (

    // Sticky chat input bar at bottom with padding and border
    <div className="sticky bottom-0 w-full border-t border-blue-500 bg-white px-4 py-3">
      {/* Input group with flex */}
      <div className="flex gap-2">
        {/* Message input field */}
        <input
          type="text"
          name="message"
          value={message || ""}
          placeholder="Type Your Message..."
          onChange={({ currentTarget: input }) => setMessage(input.value)}
          onKeyPress={(e) => (e.code === "Enter" ? sendMessage() : null)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Send button */}
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
