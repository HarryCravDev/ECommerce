const express = require("express");
const router = express.Router();
const {
  orderProducts,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
} = require("../controllers/orderController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, orderProducts)
  .get(protect, isAdmin, getAllOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

module.exports = router;
