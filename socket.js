const Promise = require('bluebird');
const _ = require('lodash');
const { isLoggedSocket } = require('./middleware/checkAuth');
const User = require('./mongodb/models/user');
const Chat = require('./mongodb/models/chat');
const Message = require('./mongodb/models/messages');

const createRequest = (socket) => {
	return {
		headers: { authorization: _.get(socket, 'handshake.headers.authorization', '') },
		socketIo: socket,
	};
};

module.exports = (io) => {
	io.use((socket, next) => isLoggedSocket(createRequest(socket), null, next)).on('connection', (socket) => {
		socket.on('join', async () => {
			if (!socket.user) return;
			socket.join(socket.user.id);
			socket.user.online = true;
			socket.user.save();
			socket.emit('get_me', socket.user);
			socket.broadcast.emit('get_online_user', socket.user);
		});

		socket.on('creat:chat', async (fromUserId, toUserId, collback) => {
			const body = { peers: [fromUserId, toUserId] };
			let chat = await Chat.findOne({ peers: { $all: [fromUserId, toUserId] } });
			if (chat) {
				chat = await Chat.populate(chat, {
					path: 'messages',
					model: 'message',
					populate: {
						path: 'user',
						model: 'user',
						select: 'email',
					},
				});
			} else {
				chat = await Chat.create(body);
				const { email = '' } = await User.findById(toUserId);
				await Message.create({ message: `Hi ${email}!`, chatId: chat._id, userId: socket.user.id });
			}
			collback(chat);
		});

		socket.on('creat:message', async (object, collback) => {
			await Message.create(object);
			const chat = await Chat.findById(object.chatId).populate({
				path: 'messages',
				model: 'message',
				populate: {
					path: 'user',
					model: 'user',
					select: 'email',
				},
			});

			Promise.each(chat.peers, async (peer) => {
				if (peer !== socket.user.id) {
					io.to(peer).emit('new message', chat);
				}
			});
			collback(chat);
		});

		socket.on('disconnect', async () => {
			if (!socket.user) return;
			await User.updateOne({ _id: socket.user.id }, { online: false });
			socket.emit('get_me', socket.user);
			socket.broadcast.emit('get_offline_user', socket.user);
		});
	});
	return io;
};
