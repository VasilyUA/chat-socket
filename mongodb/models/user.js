const mongoose = require("mongoose");
const getHash = require("../../helpers/hash");

const schema = new mongoose.Schema(
    {
        _id: {type: mongoose.Types.ObjectId, auto: true},
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            set: value => getHash(value)
        },
        online: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: {},
    },
    {
        autoIndex: false,
    },
);

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("user", schema);