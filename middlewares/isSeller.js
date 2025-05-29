const isSeller = async (req,res,next) =>{
    const {user} = req
    if (user.role !== 'seller') {
        return res.status(400).json({
            status:"error",
            message:"Oops, you are not a seller"
        })
    }
    next()
};

module.exports = isSeller