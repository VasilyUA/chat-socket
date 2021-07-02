import React, { useEffect } from "react";
import socket from "./socket";
// import Form from "./components/Form";
// import Chat from "./components/Chat";

export default function App() {
  useEffect(() => {
    socket.emit("ROOM:JOIN", { obj: "111111111" });
    socket.on("ROOM", (data) => console.log(data));
    const data = (data) => {
      console.log(data);
    };
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    socket.emit("COOL", data);
  }, []);
  return (
    <div className="wrapper">
      
    </div>
  );
}
