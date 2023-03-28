const express = require('express');
const { userRouter, authRouter, postRouter } = require('./routes');

const app = express();
require('dotenv').config();

const { PORT } = process.env;

app.use(express.json());
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);

app.listen(PORT, '0.0.0.0', async () => {
    console.log(`The Server is Listening at ${PORT}`);
});