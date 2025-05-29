const userModel = require("../model/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmailVerification = require("../services/nodemailer/sendEmailVerification");
const generateVerificationToken = require("../utils/Random");
const sendPasswordResetEmail = require("../services/nodemailer/sendPasswordResetMail");
const signUp = async (req, res, next)=>{
    const {password,email,name} = req.body;
    try {
        const token = generateVerificationToken(8);
        const tokenExp = Date.now() + 300000;
        const salt = await bcrypt.genSalt(10);
        const hashedPasssword = await bcrypt.hash(password, salt);
        const user = await userModel.create({...req.body, password:hashedPasssword, verificationToken:token, verificationExp:tokenExp});
        if(!user){
            return res.status(400).json({
                status:'error',
                message:'unable to signup'
            })
        }
        const userFirstName = name.split(" ")[0]
        sendEmailVerification(email,userFirstName,token)
        res.status(201).json({
            status:'success',
            message:'Sign up successfull, you can now Sign in',
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
};
const verifyAccount = async (req, res, next)=>{
    const {token} = req.params;
    try {
        const user = await userModel.findOne({verificationToken:token});
        if (!user) {
            return res.status(403).json({
                status:"Error",
                message:"This token is invalid or has been used"
            })
        }
        if (user.verificationExp < Date.now()) {
            return res.status(403).json({
                status:"Error",
                message:"Session timed out"
            })
        }

        await userModel.findByIdAndUpdate(user._id, {verificationToken:null, verificationExp:null, isverified:true})
        res.status(200).json({
            status:'Success',
            message:"Your account has been verified"
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
};
const signIn = async (req,res, next) =>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({
                status:'error',
                message:'email or password incorrect'
            })
        }
        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
            return res.status(400).json({
                status:'error',
                message:'email or password incorrect'
            })
        }
        const accessToken = jwt.sign({id:user._id, email:user.email}, process.env.jwt_secret, {expiresIn:process.env.jwt_exp})
        return res.status(200).json({
            status:'success',
            message:'Login successful',
            accessToken
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
};
const getAllUsers = async (req, res, next) =>{
    try {
        const users = await userModel.find();
        if(!users){
            return res.status(404).json({
                status:'error',
                message:"users not found"
            })
        }
        res.status(200).json({
            status:'success',
            message:"this are all users",
            users
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
};
const sendForgotPasswordMail = async (req, res, next)=>{
    const {email} = req.body;
    try {
        const user = await userModel.findOne({email});
        let token = generateVerificationToken(6);
        let tokenExp = Date.now() + 30000;
        const userFirstName = user?.name.split(" ")[0];
        if (!user) {
            return res.status(404).json({
                status:'error',
                message:'Unable to find User'
            })
        }
        await userModel.findOneAndUpdate(user._id, {passwordResetToken:token, passwordResetTokenExp:tokenExp})
        sendPasswordResetEmail(email, userFirstName, token)
        res.status(200).json({
            status:"success",
            message:`Email reset password has been sent to ${email}`
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
};
const resetPasswordWithToken = async(req, res, next)=>{
    const {token} = req.params;
    const {newPassword} = req.body;
    try {
        const user = await userModel.findOne({passwordResetToken:token});
        if (!user) {
            return res.status(401).json({
                status:"error",
                message:"Password reset token is invalid or has been used"
            })
        }
        if (user.passwordResetTokenExp < Date.now()) {
            return res.status(403).json({
                status:"Error",
                message:"Session timed out"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedNewPasssword = await bcrypt.hash(newPassword, salt)
        if (user.password === hashedNewPasssword) {
            console.log(true)
            return res.status(403).json({
                status:'error',
                message:"Password can't be the same"
            })
        }
        await userModel.findOneAndUpdate(user._id, {password:hashedNewPasssword, passwordResetToken:null, passwordResetTokenExp:null})
        res.status(200).json({
            status:'success',
            message:"Password changed successful"
        })
    } catch (error) {
        console.log('error')
        next(error)
    }
};
module.exports = {
    signUp,
    verifyAccount,
    signIn,
    getAllUsers,
    sendForgotPasswordMail,
    resetPasswordWithToken
}