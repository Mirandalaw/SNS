const { Router } = require('express');
const postController = require('../controllers/post.controller');
const { check } = require('express-validator');
const { validationErrorChecker } = require('../middlewares');

const postRouter = Router();

postRouter.get('/all', postController.findAllPosts);

postRouter.get('/', [
    check('post_uuid', 'PostUUID must not be empty').exists().isString(),
    validationErrorChecker
], postController.findOnePostById);

postRouter.post('/', [
    check('post_title', 'title must not be empty').exists().isString(),
    check('post_content', 'Content must not be empty').exists().isString(),
    validationErrorChecker
], postController.createPost);

postRouter.delete('/', [
    check('post_uuid', 'PostUUID must not be empty').exists().isString(),
    validationErrorChecker
], postController.deletePostById);

postRouter.patch('/title', [
    check('post_uuid', 'PostUUID must not be empty').exists().isString(),
    check('post_title', 'Title must not be empty').exists().isString(),
    validationErrorChecker
], postController.updateTitleById);

postRouter.patch('/content', [
    check('post_uuid', 'PostUUID must not be empty').exists().isString(),
    check('post_content', 'Content must not be empty').exists().isString(),
    validationErrorChecker
], postController.updateContetById);

postRouter.patch('/image-url', [
    check('post_uuid', 'PostUUID must not be empty').exists().isString(),
    check('image_url', 'ImageURL must be URL').isURL(),
    validationErrorChecker
], postController.updateImgUrlById);

module.exports = { postRouter };