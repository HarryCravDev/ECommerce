const express = require("express");
const router = express.Router();
const {
    orderProducts,
    getOrderById
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, orderProducts);
router.route("/:id").get(protect, getOrderById);


module.exports = router;
