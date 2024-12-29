const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ["Tech", "Music", "Sports", "Other"], // Modify categories as needed
    },
    visibility: {
      type: String,
      required: true,
      enum: ["Public", "Private"],
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendees: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        rsvpStatus: {
          type: String,
          enum: ["Yes", "No", "Maybe"],
        },
      },
    ],
    rsvpCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
