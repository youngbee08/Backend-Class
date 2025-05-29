const isVerified = async (req, res, next) =>{
    const {user} = req;
    if (!user.isverified) {
        return res.status(403).json({
            status:"error",
            message:"Oops, you are not verified yet"
        })
    }
    next()
};

module.exports = isVerified