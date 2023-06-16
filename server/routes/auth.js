const express = require('express');
const passport = require('passport');
const { isNotLoggedIn } = require('../middlewares');
const { join } = require('../controllers/auth');

const router = express.Router();

router.post('/join', isNotLoggedIn, join);

module.exports = router;