const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email', // req.body.email
        passwordField: 'password',
        passReqToCallback: false
    }, async (email, password, done) => {
        try {
            const findUser = await User.findOne({ where: { email }});
            if (findUser) {
                const result = await bcrypt.compare(password, findUser.password);
                if (result) {
                    done(null, findUser);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message: '없는 회원입니다.' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};