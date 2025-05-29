const categoryModel = require("../model/category");

const addNewCategory = async (req, res)=>{
    try {
        const category = await categoryModel.create(req.body);
        if (!category) {
            return res.status(400).json({
                status:"Error",
                message:"Category Not Added"
            })
        }

        res.status(201).json({
            status:"Success",
            message:"Category Added",
            category
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    addNewCategory,
}