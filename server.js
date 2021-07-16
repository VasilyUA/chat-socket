const express = require("express");
const cors = require("cors");
const path = require("path");
const DB = require("./mongodb/index");

const app = express();

DB.then(() =>
  console.log(`Mongo started ${process.env.NODE_ENV}! DB conected ...`)
).catch((e) => console.error(e));

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors("http://localhost:3000"));

app.use("/", require("./routers")(express.Router()));

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
  cors: {
    origin: "http://localhost:3000",
  },
});

require("./socket")(io);
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
    error: process.env.NODE_ENV !== "production" ? error : {},
  });
});
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(`${__dirname}/./build`)));
	app.get('/', (req, res) => {
		res.sendFile(path.join(`${__dirname}/./build/index.html`));
	});
}

server.listen(port, (err) =>
  err
    ? console.log(err)
    : console.log(`Сервер запущен: http://localhost:${port}!`)
);
