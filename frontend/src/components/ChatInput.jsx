import React from "react";

const ChatInput = ({ message, setMessage }) => {
  return (
    <div className="mt-auto align-items-end border border-info py-3 px-4 border-top d-lg-block">
      <div className="input-group flex-fill">
        <input
          type="text"
          className="form-control"
          name="message"
          value={message || ""} // ✅ Prevents [object Object] error
          placeholder="Type Your Message..."
          onChange={(e) => sendMessage(e.target.value)} // ✅ Ensure it's a string
        />
        <button className="btn btn-info">Send</button>
      </div>
    </div>
  );
};

export default ChatInput;
