const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

//  @desc   Fetch all products
//  @route  GET /api/products
//  @access Public
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//  @desc   Fetch a product by id
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

//  @desc   Delete a product by id
//  @route  DELETE /api/products/:id
//  @access Private/Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed." });
  } else {
    res.status(404);
    throw new Error(`Product not found`);
  }
});

//  @desc   Create a product
//  @route  POST  /api/products/:id
//  @access Private/Admin
exports.createProduct = asyncHandler(async (req, res) => {
  const product = new Product.create({
    name: "Same Name",
    price: 50,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//  @desc   Update a product
//  @route  PUT  /api/products/:id
//  @access Private/Admin
exports.updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});
