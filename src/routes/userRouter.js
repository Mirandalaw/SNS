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
    check('user_id').exists().isString(),
    check('nickname').exists().isString(),
    check('user_name').exists().isString(),
    check('cell_phone').exists().isString(),
    check('email').exists().isString(),
    check('birthday').exists().isString(),
    check('sex').exists().isNumeric(),
    check('password').exists().isString().isLength({ min: 8 }),
    validationErrorChecker,
], userController.create);

userRouter.put('/', [
    check('id').exists().isString(),
    check('password').exists().isLength({ min: 4 }),
    validationErrorChecker,
], userController.update);

userRouter.delete('/', [
    check('id').exists().isString(),
    validationErrorChecker,
], userController.delete);

module.exports = { userRouter };