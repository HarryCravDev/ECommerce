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
    totalPrice
  } = req.body;


  if(orderItems && orderItems.length === 0){
    res.status(400);
    throw new Error('No order items.');
    return
  } else {
    console.log(orderItems);
    const order = new Order({
        orderItems,
        user: req.connection._httpMessage.user._id,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        totalPrice
    })

    console.log(orderItems);

    const createdOrder = await order.save();



    res.status(201).json(createdOrder);
  }
});