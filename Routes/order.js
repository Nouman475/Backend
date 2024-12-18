const router = require("express").Router();
const OrderController = require("../controller/OrderController");

// Fetch all orders
router.get('/all', OrderController.getAllOrders);

// Fetch orders by user ID
router.get('/allOrders/:id', OrderController.getOrdersByUser);

// Create a new order 
router.post("/createOrder", OrderController.createNewOrder);

// Delete an order
router.delete("/deleteOrder/:id", OrderController.deleteTheOrder);

// Update shipping status
router.put("/updateOrder/:id", OrderController.updateShippingStatus);

module.exports = router;