const express = require('express');
const passport = require('passport');
const { isNotLoggedIn, isLoggedIn } = require('../middlewares');
const { join, login, logout, nicknameCheck, emailCheck } = require('../controllers/auth');

const router = express.Router();

router.post('/join', join);
router.post('/login', isNotLoggedIn, login);
router.get('/logout', isLoggedIn, logout);
router.get('/emailCheck', emailCheck);
router.get('/nicknameCheck', nicknameCheck);

module.exports = router;