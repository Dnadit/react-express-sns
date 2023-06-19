const express = require('express');
const { emailCheck, nicknameCheck, changeNickname, changePassword, withdraw } = require('../controllers/user');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

router.get('/emailCheck', emailCheck);
router.get('/nicknameCheck', nicknameCheck);
router.post('/changeNick', isLoggedIn, changeNickname);
router.post('/changePassword', isLoggedIn, changePassword);
router.delete('/withdraw', isLoggedIn, withdraw);

module.exports = router;