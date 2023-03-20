const { Router } = require('express');
const { authController } = require('../controllers');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth');
const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.get('/test', authMiddleware.checkToken, authController.test);
module.exports = { authRouter };