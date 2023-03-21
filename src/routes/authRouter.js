const { Router } = require('express');
const { authController } = require('../controllers');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth');
const authRouter = Router();

authRouter.post('/login', [
    check('userId').exists().isString(),
    check('uesr_pwd').exists().isString(),
    // check('accessToken').isJWT(),
    // check('refreshToken').isJWT(),
    validationResult,
], authController.login);
authRouter.get('/test', authMiddleware.checkToken, authController.test);
module.exports = { authRouter };