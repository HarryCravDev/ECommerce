const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

//  @desc   Fetch all products
//  @route  GET /api/products
//  @access Public
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//  @desc   Fetch single product by id
//  @route  GET /api/products/:id
//  @access Public
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error(`Product not found`);
  }
});
