const express = require("express");
const stripe = require("stripe")(process.env.SECRET_KEY);
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/orderModel");

const router = express.Router();

router
  //
  .post("/placeholder", async (req, res) => {
    const { token, subtotal, currentUser, cartItems } = req.body;

    try {
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });

      const payment = await stripe.charges.create(
        {
          amount: subtotal * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
        },
        {
          idempotencyKey: uuidv4(),
        }
      );

      if (payment) {
        const newOrder = new Order({
          name: currentUser.name,
          email: currentUser.email,
          userId: currentUser._id,
          orderItems: cartItems,
          shippingAddress: {
            street: token.card.address_line1,
            city: token.card.address_city,
            country: token.card.address_country,
            pincode: token.card.address_zip,
          },
          orderAmount: subtotal,
          transactionId: payment.source.id,
        });

        await newOrder.save();

        res.send("Order placed successfully");
      } else {
        res.send("Payment Failed");
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  })

  .get("/getuserorders", async (req, res) => {
    const { userId } = req.query;

    try {
      const orders = await Order.find({ userId: userId }).sort({ _id: -1 });
      res.send(orders);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  })

  .get("/getallorders", async (req, res) => {
    try {
      const orders = await Order.find({}).sort({ _id: -1 });
      res.send(orders);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  })

  .post("/deliverorder", async (req, res) => {
    const { orderId } = req.body;

    try {
      const order = await Order.findOne({ _id: orderId });
      order.isDelivered = true;
      await order.save();
      res.send("Order Delivered");
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
