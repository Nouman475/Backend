const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema for Cart Items
const CartItemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  mainImageUrl: {
    type: String,
    required: true,
  },
});

// schema for Orders
const OrderSchema = new Schema({
  address: {
    type: String,
  },
  cardDetails: {
    cardNumber: { type: String },
    expiryDate: { type: String },
    cardHolderName: { type: String },
    cvv: { type: String },
  },
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model for the currently logged-in user
    required: true,
  },
  cartItems: [CartItemSchema], // Array of cart items
  customerEmail: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isShipped: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
