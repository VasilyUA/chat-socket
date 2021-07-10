const {isLoggedSocket} = require('./middleware/checkAuth');
const _ = require('lodash')
const User = require('./mongodb/models/user')

const createRequest = socket => {
    return {
        headers: {authorization: _.get(socket, 'handshake.headers.authorization', '')},
        socketIo: socket,
    };
}

module.exports = io => {
    io.use((socket, next) => isLoggedSocket(createRequest(socket), null, next)).on("connection", (socket) => {
        socket.on('join', async callback => {
            if (!socket.user) return;
            socket.join(socket.user.id);
            callback(socket.user);
        });

        socket.on('get_online_users', async (callback) => {
            await User.updateOne({_id: socket.user.id}, {online: true});
            const users = await User.find({$and: [{_id: {$ne: socket.user.id}}, {online: true}]}).lean();
            callback(users)
        });

        socket.on("disconnect", async reason => {
            if (!socket.user) return;
            await User.updateOne({_id: socket.user.id}, {online: false});

        });
    });
    return io;
}