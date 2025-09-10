const express = require("express");
require("dotenv").config();
require("./models/dbConnect");
const cors = require("cors");
const app = express();
const workerRouter = require("./routes/workers");

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: (origin, callBack) => {
      callBack(null, true);
    },
    credentials: true,
  })
);
app.use("/workers", workerRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("servering is runing on port", port);
});
