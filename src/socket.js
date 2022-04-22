import io from "socket.io-client";
export default io(process.env.REACT_APP_SOCKET_ENDPOINT, {
  path: "/soket-server",
  withCredentials: true,
  extraHeaders: {
    Authorization: sessionStorage.getItem("token"),
  },
});
