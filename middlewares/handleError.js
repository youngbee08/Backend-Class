const handleDuplicateError = (err) =>{
    const errKey = Object.keys(err.keyValue)[0];
    const errValue = Object.values(err.keyValue)[0];
    const errMessage = new Error(`${errKey} of ${errValue} already exists`);
    const error = {
        statusCode:400,
        message:errMessage.message
    }
    return error
};
const handleJwtExpiredError = (err) =>{
    const errValue = err.message.split(" ")[1];
    const dateExp = new Date(err.expiredAt).toISOString().split('T')[0];
    const dateExpT = new Date(err.expiredAt).toISOString().split('T')[1];
    const dateT = new Date(dateExpT).getUTCHours() < 12;
    const errMessage = new Error (`Token ${errValue} at ${dateExp}, ${dateExpT} ${dateT?"AM":"PM"}`)
    const error = {
        statusCode:400,
        message:errMessage.message
    }
    return error
}

const handleInvalidJwtError = (err) =>{
    const errValue = err.message.split(" ")[0];
    const errMessage = new Error (`${errValue} Token`);
    const error = {
        statusCode:400,
        message:err
    }
}
const handleError = (err, req, res, next) =>{
    if (err.code === 11000) {
        const error = handleDuplicateError(err);
        res.status(error.statusCode).json({
            message: error.message
        })
    } 
    else if (err.name === 'ValidationError') {
        res.json("It's a validation error")
    } 
    else if (err.name === 'CastError') {
        res.json("It's a Cast Error")
    }
    else if (err.name === 'TokenExpiredError') {
        const error = handleJwtExpiredError(err)
        res.status(error.statusCode).json({
            message:error.message
        })
    }
    else{
        res.status(500).json({message: "Something went wrong", errorName:err.name, errorCode:err.code})
    }
};

module.exports = handleError