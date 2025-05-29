const MiddlewareTwo =(req,res,next) =>{
    console.log("You Are a seller");
    next()
};
module.exports = MiddlewareTwo