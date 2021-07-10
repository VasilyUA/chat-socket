import io from 'socket.io-client';
export default io('http://localhost:3001', {
    extraHeaders: {
        Authorization: localStorage.getItem('token')
    }
});