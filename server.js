const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const DB = require('./mongodb/index');

const app = express();

DB.then(() => console.log(`Mongo started ${process.env.NODE_ENV}! DB conected ...`)).catch((e) => console.error(e));

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors(process.env.CORS_URL.split(',')));
app.use(morgan('dev'));

app.use('/api/', require('./routers')(express.Router()));

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
	path: '/soket-server',
	serveClient: false,
	pingInterval: 10000,
	pingTimeout: 5000,
	cookie: false,
	cors: {
		origin: process.env.CORS_URL.split(','),
	},
});

require('./socket')(io);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(`${__dirname}/./build`)));
	app.get('*', (req, res) => {
		res.sendFile(path.join(`${__dirname}/./build/index.html`));
	});
}

// error 404
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		message: error.message,
		error: process.env.NODE_ENV !== 'production' ? error : {},
	});
});

server.listen(port, (err) => (err ? console.log(err) : console.log(`Сервер запущен: http://localhost:${port}!`)));
