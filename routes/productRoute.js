const express = require("express");
const productRoute = express.Router();
const {getAllProducts, getSingleProduct, addNewProduct, updateAProduct, deleteProduct, deleteAProduct} = require("../controllers/productController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isVerified = require("../middlewares/isVerified");
const isSeller = require("../middlewares/isSeller");
const hasImage = require("../middlewares/hasImage");
productRoute.get("/", getAllProducts);
productRoute.get("/:id", getSingleProduct);
productRoute.post("/add", isLoggedIn, isVerified, isSeller, hasImage, addNewProduct)
productRoute.patch("/update", updateAProduct)
productRoute.delete("/delete", deleteProduct)
productRoute.delete("/delete/:id", deleteAProduct)
module.exports = productRoute;