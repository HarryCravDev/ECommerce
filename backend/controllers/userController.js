const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

//  @desc   User login - Email & Password
//  @route  POST /api/users/login
//  @access Public
exports.userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password.");
  }
});

//  @desc   Register a new user
//  @route  POST /api/users
//  @access Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

//  @desc   Get user profile
//  @route  GET /api/users/profile
//  @access Private
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(res.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

//  @desc   Get users profile
//  @route  GET /api/users
//  @access Private
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//  @desc   Get user profile
//  @route  GET /api/users/:id
//  @access Private
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  res.json(user);
});

//  @desc   Delete user by :id
//  @route  DELETE /api/users/:id
//  @access Private
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  if (user) {
    await user.remove();
    res.json({ message: "User removed." });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

//  @desc   Update user profile
//  @route  PUT /api/users/profile
//  @access Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(res.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

//  @desc   Update user profile ADMIN
//  @route  PUT /api/users/:id
//  @access Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || false;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});
