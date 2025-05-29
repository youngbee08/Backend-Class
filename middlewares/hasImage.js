const hasImage = (req,res,next) =>{
    if (!req.body.image) {
        return res.status(403).json({
            status:'error',
            message:'Please Provide An Image'
        })
    }
    next()
};

module.exports = hasImage