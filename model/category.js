const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type:String,
        unique: [true, "Name already exixts"],
        required: [true, "Please provide a name"],
    },

    description: {
        type:String,
        required:[true, "Description Is Required"]
    },

    featuredImage: {
        type:String
    },

    tag: {
        type:String
    }
});

const categoryModel = mongoose.model("categories", categorySchema);
module.exports = categoryModel;