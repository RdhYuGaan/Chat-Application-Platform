import React from "react";

const Login = ({ newUser, handleChange, logNewUser }) => {
  return (
    // Login card container
    <div className="bg-white p-6 rounded-lg shadow-xl w-96 border border-gray-300 mx-auto mt-20">
      {/* Header */}
      <h5 className="text-xl font-semibold mb-2 text-center">Enter Username</h5>
      <p className="text-sm text-gray-500 text-center">
        Connect with your friends and family.
      </p>

      {/* Input and Button */}
      <div className="mt-4">
        {/* Username Input */}
        <input
          type="text"
          placeholder="Enter your username"
          value={newUser}
          autoComplete="off"
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => (e.key === "Enter" ? logNewUser() : null)}
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Join Button */}
        <button
          onClick={logNewUser}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Login;
