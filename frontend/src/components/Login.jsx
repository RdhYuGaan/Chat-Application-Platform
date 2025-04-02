import React from 'react'

const Login = ({newUser, handleChange, logNewUser}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-96 border border-gray-300">
          <h5 className="text-xl font-semibold mb-2 text-center">Enter Username</h5>
          <p className="text-sm text-gray-500 text-center">
            Connect with your friends and family.
          </p>
          <div className="mt-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter your username"
              value={newUser}
              autoComplete="off"
              onChange={(e) => handleChange(e)}
              onKeyPress={(e) => (e.code === "Enter" ? logNewUser() : null)}
            />
            <button
              onClick={ ()=>logNewUser()}
              className="w-full mt-4 btn-success bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Join
            </button>
          </div>
        </div>
    
  )
}

export default Login;
