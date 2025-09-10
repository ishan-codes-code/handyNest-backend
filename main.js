const express = require("express");
require("dotenv").config();
require("./models/dbConnect");
const cors = require("cors");
const app = express();
const workerRouter = require("./routes/workers");

const port = process.env.PORT || 3000;

app.use(express.json());

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === process.env.ALLOWED_ORIGIN) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/workers", workerRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
