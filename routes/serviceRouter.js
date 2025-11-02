const { getAllServices } = require("../controllers/serviceController");
const serviceRouter = require("express").Router();

serviceRouter.get("/get", getAllServices);

module.exports = serviceRouter;
