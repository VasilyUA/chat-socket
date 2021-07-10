const jwt = require("jsonwebtoken");
const User = require("../mongodb/models/user");

exports.registration = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json({msg: "Всі поля мають бути заповнені"});

    const user = await User.findOne({email})
    if (user) return res.status(400).json({msg: "Користувач з таким ім`ям вже існує"});

    const newUser = await User.create(req.body);
    const token = await jwt.sign({id: newUser.id}, process.env.JWT_SECRET_USER, {expiresIn: 3600});
    delete newUser._doc.password;
    res.json({token, user: newUser});
}