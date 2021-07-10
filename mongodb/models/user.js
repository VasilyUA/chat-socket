const {Schema, model} = require("mongoose");
const getHash = require("../../helpers/hash");

const schema = new Schema(
    {
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
        timestamps: true,
    }
);

schema.set("toJSON", {
    virtuals: true,
});

module.exports = model("user", schema);