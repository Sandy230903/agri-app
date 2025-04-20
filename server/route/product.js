const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const Constants = require('../constant')
const Mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        let result = await Product.find();
        if (result && Array.isArray(result) && result.length > 0) {
            res.json({
                code: Constants.E_STORE.HTTP.STATUS.OK.CODE,
                message: Constants.E_STORE.HTTP.STATUS.OK.MESSAGE,
                data: result
            });
        } else {
            res.json({
                code: Constants.E_STORE.HTTP.STATUS.OK.CODE,
                message: 'no products',
                data: result
            });
        }
    } catch (e) {
        res.json({ code: Constants.E_STORE.HTTP.STATUS.CONFLICT.CODE, message: 'error - ' + e.message })
    }
});

router.post('/', async (req, res) => {
    try {
        let result = await new Product(req.body).save();
        res.json({
            code: Constants.E_STORE.HTTP.STATUS.OK.CODE,
            message: Constants.E_STORE.HTTP.STATUS.OK.MESSAGE,
            data: result
        });
    } catch (e) {
        if (e instanceof Mongoose.Error.ValidationError) {
            res.json({ code: Constants.E_STORE.HTTP.STATUS.BAD_REQUEST.CODE, message: 'request validation error - ' + e.message })
        } else if (e.code === 11000) {
            res.json({ code: Constants.E_STORE.HTTP.STATUS.BAD_REQUEST.CODE, message: 'duplicate, exists in database - ' + e.message })
        } else {
            res.json({ code: Constants.E_STORE.HTTP.STATUS.CONFLICT.CODE, message: 'error - ' + e.message })
        }
    }
});

router.put('/:id', async (req, res) => {
    try {
        let result = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (result) {
            res.json({
                code: Constants.E_STORE.HTTP.STATUS.OK.CODE,
                message: Constants.E_STORE.HTTP.STATUS.OK.MESSAGE,
                data: result
            });
        } else {
            res.json({
                code: Constants.E_STORE.HTTP.STATUS.OK.CODE,
                message: 'no such product exists'
            });

        }
    } catch (e) {
        if (e instanceof Mongoose.Error.ValidationError) {
            res.json({ code: Constants.E_STORE.HTTP.STATUS.BAD_REQUEST.CODE, message: 'request validation error - ' + e.message })
        } else if (e.code === 11000) {
            res.json({ code: Constants.E_STORE.HTTP.STATUS.BAD_REQUEST.CODE, message: 'duplicate, exists in database - ' + e.message })
        } else {
            res.json({ code: Constants.E_STORE.HTTP.STATUS.CONFLICT.CODE, message: 'error - ' + e.message })
        }
    }

});

router.delete('/:id', async (req, res) => {
    try {
        let result = await Product.findByIdAndDelete(req.params.id);
        if (result) {
            res.json({
                code: Constants.E_STORE.HTTP.STATUS.OK.CODE,
                message: Constants.E_STORE.HTTP.STATUS.OK.MESSAGE,
                data: result
            });

        } else {
            res.json({
                code: Constants.E_STORE.HTTP.STATUS.OK.CODE,
                message: 'no such product exists'
            });
        }
    } catch (e) {
        res.json({ code: Constants.E_STORE.HTTP.STATUS.CONFLICT.CODE, message: 'error - ' + e.message })
    }
});

module.exports = router;
