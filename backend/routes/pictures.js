
const express = require('express');
const router = express.Router()

const Product = require('../models/pictures');

router.post('/pictures',  (req, res) => {
    product.create({
            sku: req.body.sku,
            title: req.body.title,
            description: req.body.description,
            availableSizes: req.body.availableSizes,
            price: req.body.price,
        }).then(product => {
            res.json(Product)
        })      
})

router.get('/pictures',  (req, res) => {
    product.find().then(
        product => {
            res.json(product)
        })      
})



module.exports = router;