const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const mongoDbUri = process.env.mongo_uri_1;
const connectToDb = async () =>{
    try {
        const conected = await mongoose.connect(mongoDbUri);
        if (conected) {
            console.log("MongoDB Connected");
        }
    } catch (error) {
        console.log(error);
    }
};
module.exports = connectToDb;