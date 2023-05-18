const express = require("express");
const router = express.Router();

///Route Control
router.post('/stripe', function(req, res){
//add Stripe Secret Key & Token initialization
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const BuyPlanprice = req.body.BuyPlanprice;
const token = req.body.token;
    
stripe.customers
  .create({
    email: token.email,
    source: token.id
  })
  .then(customer => {
    return stripe.charges.create({
      amount: BuyPlanprice * 100,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email
    });
  })
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send("Payment Error");
  });
  });

////Export Route
module.exports = router;