// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
var cors = require('cors')
const users = require('./routes/user'); 
const product = require('./routes/product')


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

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});