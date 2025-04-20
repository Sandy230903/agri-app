const express = require('express');
const router = express.Router();
const Order = require('../model/order');
const Mongoose = require('mongoose');
const Constants = require('../constant')

router.post('/', async (req, res) => {
    try {
        let result = await new Order(req.body).save();
        res.json({
            code: Constants.E_STORE.HTTP.STATUS.OK.CODE,
            message: Constants.E_STORE.HTTP.STATUS.OK.MESSAGE,
            data: result
        });
    } catch (e) {
        if (e instanceof Mongoose.Error.ValidationError) {
            res.json({ code: Constants.E_STORE.HTTP.STATUS.BAD_REQUEST.CODE, message: 'request validation error - ' + e.message })
        } else {
            res.json({ code: Constants.E_STORE.HTTP.STATUS.CONFLICT.CODE, message: 'error - ' + e.message })
        }
    }
});

router.get('/:id', async (req, res) => {
    try {
        let result = await Order.findById(req.params.id).populate('items.productId');
        if (result) {
            res.json({
                code: Constants.E_STORE.HTTP.STATUS.OK.CODE,
                message: Constants.E_STORE.HTTP.STATUS.OK.MESSAGE,
                data: result
            });
        } else {
            res.json({
                code: Constants.E_STORE.HTTP.STATUS.OK.CODE,
                message: 'no such order found'
            });
        }
    } catch (e) {
        res.json({ code: Constants.E_STORE.HTTP.STATUS.CONFLICT.CODE, message: 'error - ' + e.message })
    }
});

router.get('/', async (req, res) => {
    try {
        let result = await Order.find();
        if (result && Array.isArray(result) && result.length > 0) {
            res.json({
                code: Constants.E_STORE.HTTP.STATUS.OK.CODE,
                message: Constants.E_STORE.HTTP.STATUS.OK.MESSAGE,
                data: result
            });
        } else {
            res.json({
                code: Constants.E_STORE.HTTP.STATUS.OK.CODE,
                message: 'no orders found'
            });
        }
    } catch (e) {
        res.json({ code: Constants.E_STORE.HTTP.STATUS.CONFLICT.CODE, message: 'error - ' + e.message })
    }

});

router.put('/:id', async (req, res) => {
    try {
        let result = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
        res.json({
            code: Constants.E_STORE.HTTP.STATUS.OK.CODE,
            message: Constants.E_STORE.HTTP.STATUS.OK.MESSAGE,
            data: result
        });
    } catch (e) {
        if (e instanceof Mongoose.Error.ValidationError) {
            res.json({ code: Constants.E_STORE.HTTP.STATUS.BAD_REQUEST.CODE, message: 'request validation error - ' + e.message })
        } else {
            res.json({ code: Constants.E_STORE.HTTP.STATUS.CONFLICT.CODE, message: 'error - ' + e.message })
        }
    }

});

module.exports = router;