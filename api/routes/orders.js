const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orders');

const checkAuth = require('../middleware/check-auth');



router.get('/', checkAuth, OrderController.getOrders);
router.get('/:orderId', checkAuth, OrderController.getOrdersById);
router.post('/', checkAuth, OrderController.createOrder);
router.delete('/:orderId', checkAuth, OrderController.deleteOrdersById);

module.exports = router;