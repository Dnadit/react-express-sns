const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

exports.join = async (req, res, next) => {
    const { email, nickname, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email }});
        if (exUser) {
            return res.status(400).json({ message: '이미 존재하는 email'});
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nickname,
            password: hash,
        });
        return res.status(200).json({ message: '회원가입 성공' });
    } catch (error) {
        console.error(error);
        return next(error);
    }
}