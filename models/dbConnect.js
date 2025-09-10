require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));
