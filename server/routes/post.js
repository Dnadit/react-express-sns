const express = require('express');
const router = express.Router();
const { insertPost, getPosts, getMyPosts, deletePost, updatePost } = require('../controllers/post');
const { isLoggedIn } = require('../middlewares');

router.post('/insert', isLoggedIn, insertPost);
router.get('/getPosts', getPosts);
router.get('/getMyPosts', isLoggedIn, getMyPosts);
router.delete('/deletePost', isLoggedIn, deletePost);
router.patch('/updatePost', isLoggedIn, updatePost);

module.exports = router;