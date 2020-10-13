const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");

// Dotenv init config
dotenv.config();

// Connect to DB
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API working!");
});

// Routes
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
