const { Router } = require('express');
const commentRouter = Router({ mergeParams: true });
const { commentController } = require('../controllers');
const { check } = require('express-validator');
const validationErrorChecker = require('../middlewares/validator');
const authMiddleware = require('../middlewares/auth');

commentRouter.get('/all', commentController.findAllComments);

commentRouter.get('/', [
    check('comment_uuid', 'CommentUUID must not be emtpy').exists().isString(),
    validationErrorChecker
], commentController.findOneCommentById);

commentRouter.post('/', [
    check('user_uuid', 'UserUUID must not be emtpy').exists().isString(),
    check('comment_content', 'Content must not be empty').exists().isString(),
    validationErrorChecker
], commentController.createComment);

commentRouter.patch('/content', [
    check('comment_uuid', 'CommentUUID must not be emtpy').exists().isString(),
    check('comment_content', 'Content must not be empty').exists().isString(),
    validationErrorChecker
], commentController.updateCommentById);

commentRouter.delete('/', [
    check('comment_uuid', 'CommentUUID must not be emtpy').exists().isString(),
    validationErrorChecker
], commentController.deleteCommentById);

module.exports = { commentRouter };