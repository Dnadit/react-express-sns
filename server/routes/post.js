const express = require('express');
const router = express.Router();
const { insertPost, getPosts } = require('../controllers/post');
const { isLoggedIn } = require('../middlewares');

router.post('/insert', isLoggedIn, insertPost);
router.get('/getPosts', getPosts);

module.exports = router;