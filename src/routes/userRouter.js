const { Router } = require('express');
const validationErrorChecker = require('../middlewares/validator');
const { userController } = require('../controllers');
const { check } = require('express-validator');

const userRouter = Router();

userRouter.get('/all', userController.findAll);

userRouter.get('/', [
    check('id').exists().isString(),
    validationErrorChecker,
], userController.findById);

userRouter.post('/', [
    validationErrorChecker,
], userController.create);


userRouter.put('/', [
    check('userId').exists().isString(),
    check('password').exists().isLength({ min: 4 }),
    validationErrorChecker,
], userController.update);

userRouter.delete('/', [
    check('userId').exists().isString(),
    validationErrorChecker,
], userController.delete);

module.exports = { userRouter };