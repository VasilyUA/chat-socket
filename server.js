const express = require("express");
const cors = require("cors");
const DB = require("./mongodb/index");

const app = express();

DB.then(() => console.log(`Mongo started ${process.env.NODE_ENV}! DB conected ...`))
    .catch((e) => console.error(e));

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors("http://localhost:3000"));

app.get('/', (req, res) => res.json({message: 'Server worked!'}));
app.use('/', require('./routers')(express.Router()));

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

require('./socket')(io);
// error 404
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render("Erorr", {
        message: error.message,
        error: !config.IS_PRODUCTION ? error : {},
    });
})

server.listen(port, (err) =>
    err ? console.log(err) : console.log(`Сервер запущен: http://localhost:${port}!`)
);
