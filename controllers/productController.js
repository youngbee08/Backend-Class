const mongoose = require('mongoose');
const productModel = require('../model/productModel');
const getAllProducts = async (req, res)=>{
    try {
        const products = await productModel.find().populate('category');
        if (!products) {
            return res.status(401).json({
                status:"Error",
                message:"Products Not found"
            })
        }
        res.status(200).json({
            status:"success",
            message:"This Are Alll Products",
            products
        })
    } catch (error) {
        console.log(error)
    }
};
const getSingleProduct = async (req, res)=>{
    const {id} = req.params;
    try {
        const product = await productModel.findOne({id});
        if (!product) {
            res.status(404).json({
                status:'error',
                message:'Unable to find product'
            })
        }
        res.status(200).json({
            product
        })
    } catch (error) {
        console.log(error)
    }
};
const addNewProduct = async (req, res, next)=>{
    try {
        const product = await productModel.create({...req.body, seller:req.user._id});
        if (!product) {
            return res.status(401).json({
                status:"Error",
                message:"Product Not Added"
            })
        }
        res.status(201).json({
            status:"Success",
            message:`${req.body.title} Has Been Added Successfully`,
            product
        })
        console.log(`${req.body.title} Has Been Added Successfully`);
        console.log(product);
        
    } catch (error) {
        console.log(error);
        next(error)
    }
};
const updateAProduct = (req, res)=>{
    res.json({
        message:`${req.body.title} has been updated in the product list`
    })
    console.log(`${req.body.title} has been updated in the product list`);
};
const deleteProduct = (req, res)=>{
    res.json({
        message:`All Products Has Been Deleted`
    })
    console.log(`All Products Has Been Deleted`);
};
const deleteAProduct = (req, res)=>{
    res.json({
        message:`${req.body.title} has been deleted from the product list`
    })
    console.log(`${req.body.title} has been deleted from the product list`);
};
module.exports = {getAllProducts, getSingleProduct, addNewProduct, updateAProduct, deleteProduct, deleteAProduct};