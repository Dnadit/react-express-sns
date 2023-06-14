const express = require('express');
const router = express.Router();
const { insertPost, getPosts } = require('../controllers/post');

router.post('/insert', insertPost);
router.get('/getPosts', getPosts);

module.exports = router;