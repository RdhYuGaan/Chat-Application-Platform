import React from "react";

const ChatInput = ({ message, sendMessage, setMessage }) => {
  return (
    <div className="mt-auto align-items-end border border-info py-3 px-4 border-top bottom-0 position-stickey d-lg-block">
      <div className="input-group flex-fill">
        <input
          type="text"
          className="form-control"
          name="message"
          value={message || ""} // ✅ Prevents [object Object] error
          placeholder="Type Your Message..."
          onChange={({ currentTarget: input }) => setMessage(input.value)} // ✅ Ensure it's a string
          onKeyPress={(e) => (e.code === "Enter" ? sendMessage() : null)} 
        />
        <button className="btn btn-info">Send</button>
      </div>
    </div>
  );
};

export default ChatInput;
