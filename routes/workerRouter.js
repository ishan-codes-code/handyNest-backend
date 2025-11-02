const { getSW, registerWorker } = require("../controllers/workerController");

const workerRouter = require("express").Router();

workerRouter.get("/getSW", getSW);
workerRouter.post("/register", registerWorker);

module.exports = workerRouter;
