const express = require("express");
require("dotenv").config(); // Load environment variables from .env file during development
const connectToMongo = require("./connection/connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const auth = require("./Routes/authenticate");
const event = require("./Routes/event");


const app = express();

// Connect to MongoDB
connectToMongo();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/v1", auth);
app.use("/api/v2", event);


module.exports = app;