const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        _id: {type: mongoose.Types.ObjectId, auto: true},
        message: String,
        userId: {type: mongoose.Types.ObjectId, ref: 'user'},
        chatId: {type: mongoose.Types.ObjectId}
    },
    {
        timestamps: {},
    },
    {
        autoIndex: false,
    },
);

schema.virtual('user', {
    ref: 'user',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});

schema.set('toObject', {virtuals: true});
schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model("message", schema);