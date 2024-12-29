const User = require("../Models/user");
const Event = require("../Models/event");

// Create New Event
const createEvent = async (req, res) => {
  try {
    const { title, description, email, category, date, location, visibility } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const newEvent = new Event({
        title,
        description,
        category,
        date,
        location,
        visibility,
        organizer: existingUser._id,
      });

      await newEvent.save();
      res.status(200).json({ event: newEvent });
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
};

// Update Event
const updateEvent = async (req, res) => {
  try {
    const { title, description, category, date, location, visibility } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, category, date, location, visibility },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
};

// RSVP to Event
const rsvpEvent = async (req, res) => {
  try {
    const { rsvpStatus } = req.body;
    const eventId = req.params.id;
    const userId = req.user.id; // Assuming authentication middleware adds the user ID to the request

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const existingRSVP = event.attendees.find((attendee) => attendee.userId.toString() === userId);
    if (existingRSVP) {
      existingRSVP.rsvpStatus = rsvpStatus;
    } else {
      event.attendees.push({ userId, rsvpStatus });
      event.rsvpCount += 1;
    }

    await event.save();
    res.status(200).json({ message: "RSVP updated", event });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
};

// Get All Events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    if (events.length === 0) {
      res.status(404).json({ message: "No events found" });
    } else {
      res.status(200).json({ events });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Get Events with Pagination
const getPaginatedEvents = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default to 10 events
    const skip = parseInt(req.query.skip) || 0;    // Default to 0 (start from the beginning)

    const events = await Event.find()
      .sort({ date: 1 })
      .limit(limit)
      .skip(skip);

    if (events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }

    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Get a Specific Event
const getOneEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.status(200).json({ event });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getOneEvent,
  getPaginatedEvents,
  rsvpEvent,
};
