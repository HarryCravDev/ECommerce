const express = require("express");
const router = express.Router();
const {
  userAuth,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(protect, isAdmin, getUsers);
router.route("/login").post(userAuth);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
