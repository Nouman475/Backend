const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    ProfileImageUrl: { 
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    addresses: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
