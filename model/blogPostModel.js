const mongoose  = require('mongoose');
const blogPostShema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Please provide a Blog title"],
        min:5,
        max:150,
        unique:[true, "Blog Already Exists"]
    },
    content:{
        type:String,
        required:[true, "Please provide your Blog content"],
        min:20
    },
    author:{
        type:String,
        required:[true, "Please provide your Blog author's name"],
    },
    tags:{
        type:String,
        enum:["Writer","Author"]
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    publishedAt:{
        type:Date,
        isPublished : {
            type:Boolean,
            default:true
        } ? (required=[true, "Please input a published date"]):(required=false)
    },
})
const blogPostModel = mongoose.model('Blogs', blogPostShema);
module.exports = blogPostModel;