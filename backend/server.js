const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const products = require("./data/products");
const connectDB = require("./config/db");

// Dotenv init config
dotenv.config();

// Connect to DB
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API working!");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
