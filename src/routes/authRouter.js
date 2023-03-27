const { Router } = require('express');
const { authController } = require('../controllers');
const { check } = require('express-validator');
const { authMiddleware, validationErrorChecker } = require('../middlewares');
const authRouter = Router();

authRouter.post('/login', [
    check('userId').exists().isString(),
    check('user_pwd').exists().isString(),
    validationErrorChecker
], authController.login);
module.exports = { authRouter };