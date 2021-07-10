const express = require("express");
const cors = require("cors");
const DB = require("./mongodb/index");

const app = express();

DB.then(() => console.log(`Mongo started ${process.env.NODE_ENV}! DB conected ...`))
    .catch((e) => console.error(e));

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors("http://localhost:3000"));

app.use('/api', require('./routers')(express.Router()));

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});
io.on("connection", (socket) => {
    socket.on("ROOM:JOIN", (data) => console.log(data));
    socket.emit("ROOM", {obj: "22222222222"});
    socket.on("COOL", (callback) => {
        callback("test0000000000000");
    });

    socket.on("disconnect", (reason) => {
        console.log('reason', reason);
    });
});

server.listen(port, (err) =>
    err ? console.log(err) : console.log(`Сервер запущен ${port}!`)
);
