const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:[true, 'email already exists']
    },
    age:{
        type:Date,
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    role:{
        type:String,
        enum:['buyer', 'seller','admin'],
        default:'buyer'
    },
    isverified:{
        type:Boolean,
        default:false
    },
    verificationToken:{
        type:String
    },
    verificationExp:{
        type:String
    },
    passwordResetToken:{
        type:String,
        default:null
    },
    passwordResetTokenExp:{
        type:String,
        default:null
    }
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;