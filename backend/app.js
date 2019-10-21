// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
var cors = require('cors');
const pjson = require('./package.json');
const users = require('./routes/user'); 
const product = require('./routes/product')
var stripe = require('stripe')(pjson.stripeSecretKey);



mongoose.connect(config.DB, {useUnifiedTopology: true, useNewUrlParser: true}).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);


const app = express();
app.use(passport.initialize());
require('./passport')(passport);
app.use(cors()
)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/users', users);
app.use(product)

app.get('/', function(req, res) {
    res.send('hello');
});

app.use(require("body-parser").text());



app.get('/charge', function(req, res){
  const cardToken = req.query.token;
  const amount = req.query.amount;
  // Charge the user's card:
  stripe.charges.create({
    amount: amount,
    currency: 'EUR',
    description: req.query.info,
    source: cardToken,
  }, (err, charge) => {
    if (err) {
      const message = err.type + ' : ' + err.message;
      res.json({ok: false, message: message});
    } else {
      res.json({ok: true, message: 'success'});
    }
  });
});
  
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});