const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../mongodb/models/user");

exports.registration = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({msg: "Всі поля мають бути заповнені"});

        const user = await User.findOne({email})
        if (user) return res.status(400).json({msg: "Користувач з таким ім`ям вже існує"});

        const newUser = await User.create(req.body);
        const token = await jwt.sign({id: newUser.id}, process.env.JWT_SECRET_USER, {expiresIn: 3600});
        delete newUser._doc.password;
        res.json({token: `Bearer ${token}`, user: newUser});
    } catch (err) {
        res.json({error: JSON.stringify(err, null, 5)});
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({msg: "Всі поля мають бути заповнені"});

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({msg: "Невірні дані!"});

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) return res.status(400).json({msg: "Невірні дані!"});
        delete user._doc.password;
        const token = await jwt.sign({id: user.id}, process.env.JWT_SECRET_USER, {expiresIn: 3600});
        res.json({token: `Bearer ${token}`, user});
    } catch (err) {
        res.json({error: JSON.stringify(err, null, 5)});
    }
}

exports.getUser = async (req, res) => {
    try {
        res.json({user: req.user});
    } catch (err) {
        res.json({error: JSON.stringify(err, null, 5)});
    }
}

exports.userList = async (req, res) => {
    try {
        const users = await User.find({$and: [{_id: {$ne: req.user.id}}, {online: true}]}).lean();
        res.json({users});
    } catch (err) {
        res.json({error: JSON.stringify(err, null, 5)});
    }
}