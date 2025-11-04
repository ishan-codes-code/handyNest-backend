const express = require("express");
require("dotenv").config();
require("./models/dbConnect");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const workerRouter = require("./routes/workerRouter");
const serviceRouter = require("./routes/serviceRouter");
const authRouter = require("./routes/authRouter");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || origin === process.env.ALLOWED_ORIGIN) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));

app.use((req, res, next) => {
  const origin = req.get("Origin") || req.get("Referer");
  if (!origin || !origin.startsWith(process.env.ALLOWED_ORIGIN)) {
    return res.status(403).json({ error: "Access forbidden" });
  }
  next();
});

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
);

app.use("/workers", workerRouter);
app.use("/services", serviceRouter);
app.use("/auth", authRouter);

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
