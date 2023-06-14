const Post = require('../models/post');

exports.insertPost = async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,            
        });
        res.json({
            code: 200,
            message: '게시글 등록 성공',
        });
    } catch (error) {
        console.error(error);
        next(error);
    }    
};

exports.getPosts = async (req, res, next) => {    
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
};