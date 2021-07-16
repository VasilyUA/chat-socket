const jwt = require("jsonwebtoken");
const User = require("../mongodb/models/user");

exports.isLogged = async (req, res, next) => {
    try {
        let {authorization: token = ''} = req.headers;
        if (!Boolean(token)) return res.status(401).json({message: 'Немає токена!'});

        if (token.startsWith('Bearer ')) token = token.slice(7, token.length);

        return jwt.verify(token, process.env.JWT_SECRET_USER, async (err, decoded) => {
            if (err) return res.status(401).json({error: JSON.stringify(err, null, 5)});
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) return res.status(401).json({message: 'Користувач не знайдений!'});
            return next();
        });
    } catch (err) {
        console.log('My_value');
    }
};

exports.isLoggedSocket = async (req, res, next) => {
    let {authorization: token = ''} = req.headers;
    if (!Boolean(token)) return;
    if (token.startsWith('Bearer ')) token = token.slice(7, token.length);

    return jwt.verify(token, process.env.JWT_SECRET_USER, async (err, decoded) => {
        if (err) return;
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) return;
        if (req.socketIo && !req.socketIo.user) {
            req.socketIo.user = req.user;
        }
        return next();
    });
};