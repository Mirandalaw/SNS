const express = require('express');
const { userRouter, authRouter } = require('./routes');
const app = express();
require('dotenv').config();

const { PORT } = process.env;

app.use(express.json());
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, host = "0.0.0", () => {
    console.log(`The Server is Listening at ${PORT}`);
});