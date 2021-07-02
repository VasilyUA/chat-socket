import React from "react";

export default function Form() {
  return (
    <form className="join-block">
      <input type="text" placeholder="Room ID" />
      <input type="text" placeholder="Ваше имя" />
      <button className="btn btn-success">"ВХОД..."</button>
    </form>
  );
}
