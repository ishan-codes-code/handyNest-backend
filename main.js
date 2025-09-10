const express = require("express");
require("dotenv").config();
require("./models/dbConnect");
const cors = require("cors");
const app = express();
const workerRouter = require("./routes/workers");

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.ALLOWED_ORIGIN) {
      callback(null, true); // origin allowed
    } else {
      callback(new Error("Not allowed by CORS")); // origin not allowed
    }
  },
};

app.use(cors(corsOptions));

app.use("/workers", workerRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("servering is runing on port", port);
});
