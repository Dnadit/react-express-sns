const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/user');

exports.join = async (req, res, next) => {
    const { email, password, nickname } = req.body;
    try {
        const findUser = await User.findOne({ where: { email } });
        if (findUser) {
            return res.status(400).json({ message: '이미 존재하는 email' });
        }
        const findNickname = await User.findOne({ where: { nickname } });
        if (findNickname) {
            return res.status(400).json({ message: '이미 존재하는 nickname' });
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
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        const nickname = user.nickname;

        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.json({
                nickname,
                message: '로그인 성공',
            });
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.json({ message: '로그아웃 성공' });
    });
};

exports.emailCheck = async (req, res, next) => {
    const email = req.query.email;
    try {
        console.log(email);
        const findUser = await User.findOne({ where: { email } });
        if (findUser) {
            return res.status(400).json({ message: '이미 존재하는 email' });
        };
        return res.status(200).json({ message: '사용가능한 email' });
    } catch (error) {
        console.error(error);
        next(error);
    };
};

exports.nicknameCheck = async (req, res, next) => {
    const nickname = req.query.nickname;
    try {
        console.log(nickname);
        const findUser = await User.findOne({ where: { nickname } });
        if (findUser) {
            return res.status(400).json({ message: '이미 존재하는 nickname' });
        };
        return res.status(200).json({ message: '사용가능한 nickname' });
    } catch (error) {
        console.error(error);
        next(error);
    };
};