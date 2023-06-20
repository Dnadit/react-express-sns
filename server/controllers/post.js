const Post = require('../models/post');
const User = require('../models/user');

exports.insertPost = async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,            
        });
        res.json({ message: '게시글 등록 성공' });
    } catch (error) {
        console.error(error);
        next(error);
    }    
};

exports.getPosts = async (req, res, next) => {    
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['nickname'],
            },
            order: [['createdAt', 'DESC']],
        });
        res.json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.getMyPosts = async (req, res, next) => {
    const userId = req.user.id;
    try {
      const myPosts = await Post.findAll({
        include: {
            model: User,
            attributes: ['nickname'],
        },
        order: [['createdAt', 'DESC']],
        where: { UserId: userId },
      });
      res.json(myPosts);  
    } catch (error) {
        console.error(error);
        next(error);
    };
};

exports.deletePost = async (req, res, next) => {
    const id = req.query.id;    
    try {
        await Post.destroy({
            where: { id: id },
        });
        res.json({ message: '게시글 삭제 성공' });
    } catch (error) {
        console.error(error);
        next(error);
    };
};

exports.updatePost = async (req, res, next) => {
    const { content, postId } = req.body;
    try {
        const post = await Post.update({
            content: content,
        }, {
            where : { id: postId, UserId: req.user.id },
        });
        res.json({ message: '게시글 수정 성공' });
    } catch (error) {
        console.error(error);
        next(error);
    };
};