const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  isInStock: {
    type: Boolean,
    default: true
  },
  mainImageUrl: { 
    type: String,
    trim: true
  },
  secondaryImageUrls: [String], 
  price: {
    type: Number,
    required: true,
    min: 0
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
      }, 
      review: { 
        type: String, 
        required: true 
      },  
      timestamp: { 
        type: Date, 
        default: Date.now 
      },  
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
