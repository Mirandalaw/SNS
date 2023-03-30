const { Router } = require('express');
const { commentDislikeController } = require('../controllers');

const commentDislikeRouter = Router({ mergeParams: true });

commentDislikeRouter.get('/all', commentDislikeController.findAllCommentDislikes);
commentDislikeRouter.get('/', commentDislikeController.findOneCommentDislikeById);
commentDislikeRouter.post('/', commentDislikeController.createCommentDislike);
commentDislikeRouter.patch('/', commentDislikeController.updateCommentDislikeById);
commentDislikeRouter.delete('/', commentDislikeController.deleteCommentDislikeById);

module.exports = { commentDislikeRouter };