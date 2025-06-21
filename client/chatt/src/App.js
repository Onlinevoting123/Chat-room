import "./App.css";
import io from "socket.io-client";
import React,{ useState,useEffect } from "react";
import Chat from "./Chat";
import hero from "./hero.mp4";
import logo from "./log.png";

const socket = io.connect("https://chat-room-1oj4.vercel.app/");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="full">
    <img style={{top:'-12px',left:'1200px',position:'absolute'}} src={logo} height={150} width={150}/>
    <video class="video-bg" src={hero} autoPlay loop muted/>
      {!showChat ? (
        <>
        <h1>Want to <b style={{color:'blue'}}>connect</b> and communicate<br/> 
        with your friends, family, team, or community?<br/> 
        Simply share the same <b style={{color:'blue'}}>Room ID</b> to join together<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-it's that easy and seamless.</h1>
        <div className="App">
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="   John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="   Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <div className="but">
         <button onClick={joinRoom}>Join A Room</button>
         </div>
         </div>
        </div></>
      ) : (
        <div className="App">
        <Chat socket={socket} username={username} room={room} /></div>
      )}
      <p style={{left:'500px',position:'absolute'}}>@2025 chat_room.All rights reserved</p>
      </div>
  );
}

export default App;
