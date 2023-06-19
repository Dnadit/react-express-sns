const User = require('../models/user');
const bcrypt = require('bcrypt');

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

exports.changeNickname = async (req, res, next) => {
    const { nickname, newNickname } = req.body;
    try {
        await User.update({
            nickname: newNickname,
        }, {
            where: { nickname: nickname },
        });
        res.json({ message: '닉네임변경 성공'});
    } catch (error) {
        console.error(error);
        next(error);
    };
};

exports.changePassword = async (req, res, next) => {
    const { nickname, newPassword } = req.body;
    const hash = await bcrypt.hash(newPassword, 12);
    try {
      await User.update({
        password: hash,        
      }, {
        where: { nickname: nickname },
      });
      res.json({ message: '비밀번호변경 성공' });
    } catch (error) {
        console.error(error);
        next(error);
    };
};

exports.withdraw = async (req, res, next) => {
    userId = req.user.id;
    try {
        await User.destroy({
            where: { id: userId },
        });
        res.json({ message: '회원삭제 성공' });
    } catch (error) {
        console.error(error);
        next(error);
    };
};