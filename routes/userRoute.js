const express = require('express');
const { signUp,signIn,getAllUsers, verifyAccount, sendForgotPasswordMail, resetPasswordWithToken } = require('../controllers/userController');
const userRoute = express.Router();

userRoute.post('/signup', signUp);
userRoute.post('/verify/:token', verifyAccount);
userRoute.post('/signIn', signIn);
userRoute.post('/forgot-password', sendForgotPasswordMail)
userRoute.post('/resetPassword/:token', resetPasswordWithToken)
userRoute.get('/all', getAllUsers);


module.exports = userRoute