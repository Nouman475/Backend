const Order = require('../Models/order');

const orderController = {
  // Create a new order
  async createNewOrder(req, res) {
    try {
      const { address, cardDetails, cartItems, customerEmail, paymentMethod, orderedBy } = req.body;

      const newOrder = new Order({
        address,
        cardDetails,
        orderedBy,
        cartItems,
        customerEmail,
        paymentMethod,
      });

      await newOrder.save();
      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Failed to create order', error });
    }
  },

  // Fetch all orders
  async getAllOrders(req, res) {
    try {
      const orders = await Order.find(); // Fetch all orders
      res.status(200).json({ message: 'Orders fetched successfully', orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Failed to fetch orders', error });
    }
  },

  // Fetch orders by user ID (orderedBy field)
  async getOrdersByUser(req, res) {
    try {
      const userId = req.params.id; 
      const orders = await Order.find({ orderedBy: userId }); // Fetch orders matching the user ID
      
      res.status(200).json({ message: 'Orders fetched successfully', orders });
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({ message: 'Failed to fetch user orders', error });
    }
  },

  // Delete an order by ID
  async deleteTheOrder(req, res) {
    try {
      const  orderId  = req.params.id;
      const deletedOrder = await Order.findByIdAndDelete(orderId);

      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Failed to delete order', error });
    }
  },

  // Update the shipping status of an order
  async updateShippingStatus(req, res) {
    try {
      const orderId = req.params.id;
      const { isShipped } = req.body;
     

      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { isShipped },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json({ message: 'Shipping status updated successfully', order: updatedOrder });
    } catch (error) {
      console.error('Error updating shipping status:', error);
      res.status(500).json({ message: 'Failed to update shipping status', error });
    }
  },
};

module.exports = orderController;
