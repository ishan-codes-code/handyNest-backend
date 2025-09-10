const workerModel = require("../models/workerModel");
const serviceModel = require("../models/serviceModel");

const getSW = async (req, res) => {
  try {
    const pin = req.query.pin;

    const workers = await workerModel
      .find({ pincode: pin })
      .populate("services");

    if (workers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No workers are available in this area",
      });
    }

    // const services = workers.flatMap((worker) => worker.services);

    return res.status(200).json({
      success: true,
      workers: workers,
      // services: services,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { getSW };
