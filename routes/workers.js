const { getSW } = require("../controllers/getSW");

const workerRouter = require("express").Router();

workerRouter.get("/getSW", getSW);

module.exports = workerRouter;
