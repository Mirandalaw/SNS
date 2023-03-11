const { Router } = require('express');
const { authController } = require('../controllers');
const authMiddleware = require('../middlewares/auth');
const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.get('/test', authMiddleware.checkToken, authController.test);
module.exports = { authRouter };