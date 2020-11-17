const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      res.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorised, token failed.");
    }
  }

  if (!req.headers.authorization) {
    res.status(401);
    throw new Error("Not authorised, no token.");
  }
});

exports.isAdmin = (req, res, next) => {
  const { isAdmin } = req.res.user;

  if (req.res.user && isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorised as an admin.");
  }
};
