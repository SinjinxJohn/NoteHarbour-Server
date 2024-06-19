const express = require('express');
const { signup, signin, logout } = require('../Controllers/userController');
const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post('/signup', signup);
userRouter.post('/login', signin);
userRouter.get('/logout', logout);

module.exports = userRouter;