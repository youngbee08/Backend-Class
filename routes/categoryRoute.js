const express = require('express');
const categoryRouter = express.Router();
const { addNewCategory } = require('../controllers/categoryController');

categoryRouter.post("/", addNewCategory)

module.exports = categoryRouter;
