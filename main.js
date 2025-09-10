const express = require("express");
require("dotenv").config();
require("./models/dbConnect");
const cors = require("cors");
const app = express();
const workerRouter = require("./routes/workers");

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === process.env.ALLOWED_ORIGIN) {
      callback(null, true); // allow
    } else {
      callback(new Error("Not allowed by CORS"));
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
