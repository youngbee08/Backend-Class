const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
const isLoggedIn = async (req, res, next) =>{
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1]
        }
        if (!token) {
            return res.status(403).json({
                status:'error',
                message:'Please provide a token'
            })
        }
        const decoded = jwt.verify(token, process.env.jwt_secret)
        const user = await userModel.findById(decoded.id);
        if (!user) {
            res.status(404).json({
                status:"error",
                message:"This token belongs to no one"
            })
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
};
module.exports = isLoggedIn