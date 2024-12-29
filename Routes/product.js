const router = require("express").Router();
const eventController = require("../controller/CrudController");

// Create New Event
router.post("/addEvent", eventController.createEvent);

// Update Event
router.put("/updateEvent/:id", eventController.updateEvent);

// Delete Event
router.delete("/deleteEvent/:id", eventController.deleteEvent);

// Get All Events
router.get("/getEvents", eventController.getEvents);

// Get a Single Event
router.get("/getEvent/:id", eventController.getOneEvent);

// Get Paginated Events (e.g., 10 events at a time)
router.get("/getPaginatedEvents", eventController.getPaginatedEvents);

// RSVP to an Event
router.post("/rsvpEvent/:id", eventController.rsvpEvent);

module.exports = router;
