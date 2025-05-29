const blogPostModel = require("../model/blogPostModel");

const addNewBlog = async (req, res)=>{
    try {
        const postBlog = await blogPostModel.create(req.body);
        if (!postBlog) {
            return res.status(400).json({
                status:"Error",
                message:"Blog Not Posted"
            })
        }
        res.status(201).json({
            status:"Success",
            message:"Blog Posted Successfully",
            postBlog
        })

    } catch (error) {
        console.log(error);
    }
};
const getAllBlogs = async (req,res)=>{
    try {
        const blogs = await blogPostModel.find();
        if (!blogs) {
            return res.status(404).json({
                status:'error',
                message:'Blog Not Found'
            })
        }
        res.status(200).json({
            status:'success',
            message:'This are all blogs',
            blogs
        })
    } catch (error) {
        console.log(error);
    }
}
const getBlogById = async (req,res) =>{
    const {id} = req.params;
    try {
        const blog = await blogPostModel.findById(id);
        if (!blog) {
            return res.status(404).json({
                status:'error',
                message:'Unable to find blog'
            })
        }
        res.status(200).json({
            status:'success',
            message:'Blog found successful',
            blog
        })
    } catch (error) {
        console.log(error);
    }
}
const getBlogByAuthor = async (req,res) =>{
    const {author} = req.query;
    try {
        const blog = await blogPostModel.findOne({author:author});
        if (!blog) {
            return res.status(404).json({
                status:'error',
                message:'Unable to find blog'
            })
        }
        res.status(200).json({
            status:'success',
            message:`Blog with Author ${req.query.author} was found successful`,
            blog
        })
    } catch (error) {
        console.log(error);
    }
}
const updateBlog = async (req,res) =>{
    const {id} = req.params;
    try {
        const blog = await blogPostModel.findByIdAndUpdate(id, req.body);
        if (!blog) {
            return res.status(404).json({
                status:'error',
                message:'Unable to find blog'
            })
        }
        res.status(201).json({
            status:'success',
            message:'Blog updated successful',
            blog
        })
    } catch (error) {
        console.log(error);
        
    }
};
const deleteBlog = async (req,res) =>{
    const {id} = req.params;
    try {
        const blog = await blogPostModel.findById(id);
        if (!blog) {
            return res.status(404).json({
                status:'error',
                message:'Unable to find blog, it might have been deleted before'
            })
        }
        await blogPostModel.findByIdAndDelete(id);
        res.status(201).json({
            status:'success',
            message:'Blog deleted successful',
        })
    } catch (error) {
        console.log(error);
        
    }
};
module.exports = {
    addNewBlog,
    getAllBlogs,
    updateBlog,
    getBlogById,
    deleteBlog,
    getBlogByAuthor
}