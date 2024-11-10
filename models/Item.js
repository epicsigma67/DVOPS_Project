const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    _id: String,
    name: String,
    price: Number,
    description: String
});

module.exports = mongoose.model('Item', itemSchema);