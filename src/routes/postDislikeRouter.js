const { Router } = require('express');
const { postDislikeController } = require('../controllers');

const postDislikeRouter = Router({ mergeParams: true });

postDislikeRouter.get('/all', postDislikeController.findAllPostDislikes);
postDislikeRouter.get('/', postDislikeController.findOnePostDislikeById);
postDislikeRouter.post('/', postDislikeController.createPostDislike);
postDislikeRouter.patch('/', postDislikeController.updatePostDislikeById);
postDislikeRouter.delete('/', postDislikeController.deletePostDislikeById);

module.exports = { postDislikeRouter };