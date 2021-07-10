const hash = require("bcryptjs");

module.exports = value => {
    const salt = hash.genSaltSync(12);
    return hash.hashSync(value,  salt);
};