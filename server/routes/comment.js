const express = require('express');
const { insertComment, getComments, deleteComment } = require('../controllers/comment');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

router.post('/insert', isLoggedIn, insertComment);
router.get('/getComments', getComments);
router.delete('/deleteComment', isLoggedIn, deleteComment);

module.exports = router;