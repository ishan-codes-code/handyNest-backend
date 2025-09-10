const express = require("express");
require("./models/dbConnect");
const cors = require("cors");
const app = express();
const workerRouter = require("./routes/workers");

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

app.listen("3000", () => {
  console.log("servering is runing on port 3000");
});
