const express = require("express");
const stripe = require("stripe")(
  "sk_test_51PyBuHGBRsgl6h5s8xBYJgeTgDZngb7b9Hil2pesyaU2255cZ7dqtiJqIAj0JsTrKq7YzM8Wngnnxs1UXMu1vnnj00mO1CmSoi"
);
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.post("/placeholder", async (req, res) => {
  const { token, subtotal, currenctUser, cartItems } = req.body;

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
      res.send("Payment Done");
    } else {
      res.send("Payment Failed");
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
