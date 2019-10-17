// User.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    sku: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    availableSizes: {
        type: Array
    },
    price: {
        type: Number,
    },

    isFreeShipping : {
        type : Boolean,
    }


});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;