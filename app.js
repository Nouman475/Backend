const express = require("express");
require("dotenv").config(); // Load environment variables from .env file during development
const connectToMongo = require("./connection/connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const auth = require("./Routes/authenticate");
const product = require("./Routes/product");
const order = require("./Routes/order");

const app = express();

// Connect to MongoDB
connectToMongo();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/v1", auth);
app.use("/api/v2", product);
app.use("/api/v3", order);

module.exports = app;