// User.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
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

    image:{
        type: String
    }
   
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;