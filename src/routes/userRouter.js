const { Router } = require('express');
const userModels = require('../models/userModels');
const userRouter = Router();

userRouter.get('/all', async (req, res) => {
    const user = await userModels.getUsers();
    return res.send({ user: user });
})

userRouter.post('/', async (req, res) => {
    const { userName, userId, userPwd, birthDate, sex } = req.body;
    const data = await userModels.createUser(userName, userId, userPwd, birthDate, sex);
    return res.send({ data });
})

userRouter.get('/', async (req, res) => {
    const userId = req.query.id;
    const data = await userModels.getOneUser(userId);
    return res.send({ data });
})

userRouter.put('/', async (req, res) => {
    const userId = req.query.id;
    const { password } = req.body;
    const data = await userModels.updateUser(userId, password);
    return res.send({ data });
})

userRouter.delete('/', async (req, res) => {
    const userId = req.query.id;
    const data = await userModels.deleteUser(userId);
    return res.send({ data });
})
module.exports = { userRouter };