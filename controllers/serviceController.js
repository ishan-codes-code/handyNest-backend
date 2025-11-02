const serviceModel = require("../models/serviceModel");

const getAllServices = async (req, res) => {
  try {
    const services = await serviceModel.find();

    return res.status(200).json({
      success: true,
      services: services,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllServices };
