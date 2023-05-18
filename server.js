const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
var cors = require('cors');
const paymentHandler = require('./routeHandler/paymentHandler');


//App initialization
const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

//Route
app.use('/payment', paymentHandler);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



////listen server
app.listen(PORT, ()=>{
  console.log(`Server run port ${PORT}`);
});