const mongoose = require('mongoose');
const Constants = require('../constant')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: Constants.E_STORE.GENERIC.PRODUCT_NAME.MIN_LENGTH,
        maxlength: Constants.E_STORE.GENERIC.PRODUCT_NAME.MAX_LENGTH,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    priceUnit: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });
ProductSchema.index({ 'name': 1 }, { unique: true });
module.exports = mongoose.model('product', ProductSchema);