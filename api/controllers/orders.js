const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.getOrders = (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: `/products/${doc.product._id}`
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
}


exports.getOrdersById = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .populate('product')
        .exec()
        .then(order => {
            if (!order) {
                res.status(404).json({
                    message: "Order Not Found"
                });
            }
            res.status(200).json({
                order: order
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}


exports.createOrder = (req, res, next) => {
    Product.findById(req.body.productId)
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product Not Found'
                });
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save()
        })
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err.message
            });
        });
}


exports.deleteOrdersById = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.remove({ _id: orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order Deleted"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}