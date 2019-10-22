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



mongoose.connect(config.DB, { useUnifiedTopology: true, useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
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

app.get('/', function (req, res) {
  res.send('hello');
});

app.use(require("body-parser").text());




app.get('/charge', function (req, res) {
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
      res.json({ ok: false, message: message });
    } else {
      res.json({ ok: true, message: 'success' });
    }
  });
});

nodemailer = require('nodemailer');


app.post('/send-email', function (req, res) {
  const products = req.body.product

   const product = products.map(p => {
    return (
      `<li>${p.count} piéces du produit ${p.description} au prix de ${p.price}</li>`)
  })

  const clientName = req.body.clientName
  const clientId = req.body.clientId


  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2d24a055499fc2",
      pass: "61b7a8e6a9f11c"
    }
  });
  let mailOptions = {
    from: 'samuel', // Sender address
    to: 'to@email.com',         // List of recipients
    subject: `commande client ${clientId}`, // Subject line
    text: ``,
    html: `<p>Monsieur ${clientName} dont l'id est ${clientId} à commandé ses produits :</p>
              <ul>${product}</ul>`, // html body
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.render('index');
  });
});





const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});