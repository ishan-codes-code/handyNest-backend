const { workerModel, workerDetailsModel } = require("../models/workerModel");
const serviceModel = require("../models/serviceModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const getSW = async (req, res) => {
  try {
    const pin = req.query.pin;

    const workers = await workerDetailsModel
      .find({ pincode: pin })
      .populate("service");

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

const registerWorker = async (req, res) => {
  try {
    const workerData = req.body;

    const existingWorker = await workerModel.findOne({
      email: workerData.email,
    });
    console.log(existingWorker);
    if (existingWorker) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    const service = await serviceModel.find({ name: workerData.service });
    if (service.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid service selected" });
    }

    const workerDetails = await new workerDetailsModel({
      name: workerData.name,
      email: workerData.email,
      svcDesc: service[0].description,
      experience:
        workerData.experience.num + " " + workerData.experience.period,
      phone: workerData.phone,
      city: workerData.workerCity,
      pincode: workerData.pincode,
      workerWage: workerData.workerWage,
      languages: workerData.languages,
      workType: workerData.workType,
      bio: workerData.workerBio?.trim(),
      service: service[0]._id,
    });

    const savedWorkerDetails = await workerDetails.save();

    const worker = new workerModel({
      email: workerData.email,
      name: workerData.name,
      details: savedWorkerDetails._id,
    });

    worker.password = await bcrypt.hash(workerData.password, 10);

    await worker.save();

    return res
      .status(200)
      .json({ success: true, message: "Worker registered successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { getSW, registerWorker };
