const mongoose = require('mongoose');
const Constants = require('../constant');
const Product = require('./product');


const ItemInOrderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
        validate: {
            validator: async function (pId) {
                return await Product.findById(pId);
            }
        },
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const OrderSchema = new mongoose.Schema({
    buyerName: {
        type: String,
        minlength: Constants.E_STORE.GENERIC.USER_NAME.MIN_LENGTH,
        maxlength: Constants.E_STORE.GENERIC.USER_NAME.MAX_LENGTH,
        trim: true
    },
    buyerContact: {
        type: String,
        required: true,
        validate: {
            validator: function (number) {
                if (number) {
                    var phoneNum = number.replace(/[^\d]/g, '');
                    if (phoneNum.length === 10) { // Support only 10 digit phone number for now.
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        },
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    items: {
        type: [ItemInOrderSchema],
        required: true,
        validate: {
            validator: function (items) {
                if (items && Array.isArray(items) && items.length > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Delivered'],
        default: 'Pending'
    }
});
OrderSchema.index({ 'status': 1 });   //for order processing related queries
OrderSchema.index({ 'buyerContact': 1 });   //for buyer rewards, etc.

module.exports = mongoose.model('order', OrderSchema);