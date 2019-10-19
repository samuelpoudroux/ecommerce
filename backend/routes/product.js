// user.js

const express = require('express');
const router = express.Router();
const multer = require('multer');

const Product = require('../models/Products');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/public/products/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage, limits: {
    fileSize: 1024 * 1024 * 5 
} })

router.post('/product', upload.single('productImage'), (req, res, next) => {
    Product.create({
        title: req.body.title,
        description: req.body.description,
        availableSizes: req.body.availableSizes,
        price: req.body.price,
        image: req.file.filename
    }).then(product => {
        res.json(product)
    }).catch(error => {
        console.log(error)
    })
})

router.get('/product', (req, res) => {
    Product.find().then(
        product => {
            res.json(product)
        })
})



module.exports = router;