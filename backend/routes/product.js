// user.js

const express = require('express');
const router = express.Router()

const Product = require('../models/Products');

router.post('/product',  (req, res) => {
    Product.create({
            sku: req.body.sku,
            title: req.body.title,
            description: req.body.description,
            availableSizes: req.body.availableSizes,
            price: req.body.price,
        }).then(product => {
            res.json(product)
        })      
})

router.get('/product',  (req, res) => {
    Product.find().then(
        product => {
            res.json(product)
        })      
})



module.exports = router;