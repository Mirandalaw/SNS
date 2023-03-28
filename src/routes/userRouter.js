const { Router } = require('express');
const { validationErrorChecker, authMiddleware } = require('../middlewares');
const { userController } = require('../controllers');
const { check } = require('express-validator');

const userRouter = Router();

userRouter.get('/all', userController.findAllUsers);

userRouter.get('/', [
    check('userId', 'UserId must not be empty').exists().isString(),
    validationErrorChecker,
], userController.findOneUserById);

userRouter.post('/signup', [
    check('user_id', 'UserId must not be empty').exists().isString(),
    check('nickname', 'Nickname must not be empty').exists().isString(),
    check('user_name', 'Username must not be empty').exists().isString(),
    check('cell_phone', 'Phone number must not be empty').exists().isString(),
    check('email', 'Email must not be empty').exists().isString(),
    check('birthday', 'Birth must not be empty').exists().isString(),
    check('sex', 'Sex must not be empty').exists().isNumeric(),
    check('password', 'Password must not be empty').exists().isString().isLength({ min: 8 }),
    validationErrorChecker,
], userController.signUp);

userRouter.delete('/', [
    check('user_id', 'UserId must not be empty').exists().isString(),
    validationErrorChecker,
], userController.delete);

userRouter.patch('/name', [
    check('user_id', 'UserId must not be empty').exists().isString(),
    check('user_name', 'Username must not be empty').exists().isString(),
    validationErrorChecker
], userController.updateName);

userRouter.patch('/nickname', [
    check('user_id', 'UserId must not be empty').exists().isString(),
    check('nickname', 'Nickname must not be empty').exists().isString(),
    validationErrorChecker
], userController.updateNickname);

userRouter.patch('/password', [
    check('user_id', 'UserId must not be empty').exists().isString(),
    check('password', 'Password must not be empty').exists().isString(),
    validationErrorChecker
], userController.updatePassword);

userRouter.patch('/email', [
    check('user_id', 'UserId must not be empty').exists().isString(),
    check('email', 'Email must not be empty').exists().isString(),
    validationErrorChecker
], userController.updateEmail);

userRouter.patch('/cell-phone', [
    check('user_id', 'UserId must not be empty').exists().isString(),
    check('cell_phone', 'Phone number must not be empty').exists().isString(),
    validationErrorChecker
], userController.updateCellPhone);

// userRouter.patch('/:user_name', userController.update);

// userRouter.put('/', [
//     check('user_id', 'Id must not be empty').exists().isString(),
//     check('user_password', 'Password must not be empty').exists().isLength({ min: 4 }),
//     validationErrorChecker,
// ], userController.update);

module.exports = { userRouter };