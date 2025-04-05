import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Main from "./components/Main";
import {io} from "socket.io-client";


// Establish the Socket.IO connection
const socket=io("http://localhost:4000");

function App() {
  

  return (
     // Pass the socket to Main component
    <Main socket={socket}/>
    
  );
}

export default App;
