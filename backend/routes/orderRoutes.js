const express = require("express");
const router = express.Router();
const {
    orderProducts
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, orderProducts);


module.exports = router;
