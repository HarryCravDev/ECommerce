const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

//  @desc   Create new order
//  @route  POST /api/orders
//  @access Private
exports.orderProducts = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items.");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.connection._httpMessage.user._id,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//  @desc   Get order by ID
//  @route  GET /api/orders/:id
//  @access Private
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});

//  @desc   Update order to paid
//  @route  PUT /api/orders/:id/pay
//  @access Private
exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body._id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});

//  @desc   Get logged in user orders
//  @route  GET /api/orders/myorders
//  @access Private
exports.getMyOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.headers._id });
  res.json(order);
});

//  @desc   Get all orders
//  @route  GET /api/orders/
//  @access Private/Admin
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("_id user");
  console.log(orders);
  res.json(orders);
});
