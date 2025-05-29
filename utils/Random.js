const crypto = require ("crypto");
const generateVerificationToken = (num=6) =>{
    const token = crypto.randomBytes(num).toString("hex");
    return token
};

module.exports = generateVerificationToken