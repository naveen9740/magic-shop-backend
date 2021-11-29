const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const router = express.Router();

router.post("/payment", async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "INR",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json({ success: false, stripeErr });
      } else {
        res.json({ success: true, stripeRes });
      }
    }
  );
});

module.exports = router;
