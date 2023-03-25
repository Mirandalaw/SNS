const { Router } = require('express');
const { validationErrorChecker } = require('../middlewares');
const { userController } = require('../controllers');
const { check } = require('express-validator');

const userRouter = Router();

userRouter.get('/all', userController.findAll);

userRouter.get('/', [
    check('userId', 'Id must not be empty').exists().isString(),
    validationErrorChecker,
], userController.findById);

userRouter.post('/', [
    check('user_id', 'ID must not be empty').exists().isString(),
    check('nickname', 'Nickname must not be empty').exists().isString(),
    check('user_name', 'Username must not be empty').exists().isString(),
    check('cell_phone', 'Phone number must not be empty').exists().isString(),
    check('email', 'Email must not be empty').exists().isString(),
    check('birthday', 'Birth must not be empty').exists().isString(),
    check('sex', 'Sex must not be empty').exists().isNumeric(),
    check('password', 'Password must not be empty').exists().isString().isLength({ min: 8 }),
    validationErrorChecker,
], userController.create);

userRouter.put('/', [
    check('id', 'Id must not be empty').exists().isString(),
    check('password', 'Password must not be empty').exists().isLength({ min: 4 }),
    validationErrorChecker,
], userController.update);

userRouter.delete('/', [
    check('id', 'Id must not be empty').exists().isString(),
    validationErrorChecker,
], userController.delete);

module.exports = { userRouter };