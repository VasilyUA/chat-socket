const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        _id: {type: mongoose.Types.ObjectId, auto: true, ref: 'message'},
        peers: [String],
    },
    {
        timestamps: {},
    },
    {
        autoIndex: false,
    },
);

schema.virtual('messages', {
    ref: 'message',
    localField: '_id',
    foreignField: 'chatId',
    justOne: false,
});

schema.set('toObject', {virtuals: true});
schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model("chat", schema);