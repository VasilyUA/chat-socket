import React, { useEffect } from "react";
import socket from "./socket";

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
  return <div className="App">TTTT </div>;
}
