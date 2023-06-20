const Comment = require('../models/comment');
const User = require('../models/user');

exports.insertComment = async (req, res, next) => {
    const { content, postId } = req.body;
    const userId = req.user.id;
    console.log('insertcomment 실행');
    try {
        await Comment.create({
            content: content,
            UserId: userId,
            PostId: postId,
        });
        res.json({ message: '댓글 등록 성공' });
    } catch (error) {
        console.error(error);
        next(error);
    };
};

exports.getComments = async (req, res, next) => {
    const postId = req.query.postId;
    try {
      const comments = await Comment.findAll({
        include: {
            model: User,
            attributes: ['nickname'],
        },
        order: [['createdAt', 'DESC']],
        where: { postId },
      });
      res.json(comments);
    } catch (error) {
        console.error(error);
        next(error);
    };
};

exports.deleteComment = async (req, res, next) => {
    const commentId = req.query.id;
    console.log(commentId);
    const userId = req.user.id;
    console.log(userId);
    try {
        await Comment.destroy({
            where: { id: commentId, UserId: userId },
        });
        res.json({ message: '댓글 삭제 성공' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};