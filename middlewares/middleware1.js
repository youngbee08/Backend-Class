const MiddlewareOne =(req,res,next) =>{
    console.log("You Are Logged In");
    next()
};
module.exports = MiddlewareOne