const express = require('express');
const passport = require('passport');
const { isNotLoggedIn, isLoggedIn } = require('../middlewares');
const { join, login, logout, checkSession } = require('../controllers/auth');

const router = express.Router();

router.post('/join', join);
router.post('/login', isNotLoggedIn, login);
router.get('/logout', isLoggedIn, logout);

module.exports = router;