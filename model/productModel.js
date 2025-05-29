const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id:{
        type:Number,
        // required:true,
        unique:[true, "id can't be the same"]
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:10,
        max:100
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories'
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    image:{
        type:String
    }
});

const productModel = mongoose.model("Products", productSchema)
module.exports = productModel;