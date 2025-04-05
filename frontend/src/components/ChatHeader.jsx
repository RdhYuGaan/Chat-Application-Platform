import React from "react";

const ChatHeader = ({ user }) => {
  return (
    // Sticky top header with border and padding
    <div className="sticky top-0 bg-white border-b-2 border-blue-500 px-4 py-2 w-full z-10">
      {/* Flex container for profile image and username */}
      <div className="flex items-center space-x-3">
        {/* User Avatar */}
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt={user.username}
            className="rounded-full w-10 h-10"
          />
        </div>

        {/* Username Display */}
        <div className="text-gray-800 font-semibold">
          Logged in as {user.username}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
