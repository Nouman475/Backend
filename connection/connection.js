const mongoose = require("mongoose")
require('dotenv').config();


const mongoURI = process.env.MONGO_CONNECTION_STRING
const connection = async(req,res) => {
  try {
    await mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  } catch (error) {
   console.log("Error connecting to Mongo DB")
  }
}

connection()
