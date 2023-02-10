var cors = require('cors')
const express = require('express')
//add Stripe Secret Key
const stripe = require('stripe')('sk_test_51MZk6BHTPolvFWGjrzC1ZiFbdnmkEHeqQcdkBqP7vtcAQwAg0U9NBZF2rwBnk6kn33xeIl0jYQEzeF5cTivXYyII00ZgQDhOJ9');

const app = express()

//Middleware
app.use(express.json())
app.use(cors())

//Route
app.get('/', function (req, res) {
  res.send('Hello World')
});

app.post('/payment', function(req, res){
  const BuyPlanprice = req.body.BuyPlanprice;
  const token = req.body.token;
  
stripe.customers.create({
    email: token.email,
    source: token.id
  })
    .then(customer => {
stripe.charges.create({
  amount: BuyPlanprice*100,
  currency: 'usd',
  customer: customer.id,
  receipt_email: token.email
})

    }).then(result=> res.status(200).json(result))
    .catch(error => console.error(error));
});

///Listen
app.listen(4000)