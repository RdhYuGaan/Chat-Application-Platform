import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Main from "./components/Main";
import {io} from "socket.io-client";

const socket=io("http://localhost:4000");

function App() {
  

  return (
    <Main socket={socket}/>
    
  );
}

export default App;
