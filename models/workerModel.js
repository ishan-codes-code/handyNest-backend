const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    verified: { type: Boolean, default: false },
    contactPerson: { type: String },
    title: { type: String }, // e.g. "Electrician"
    hourlyRate: { type: Number },
    responseTime: { type: String }, // e.g. "1h"
    rating: { type: Number },
    reviewCount: { type: Number },
    experience: { type: String }, // e.g. "8 yrs"
    distance: { type: String }, // e.g. "5 miles"
    completedJobs: { type: Number },

    specializations: [{ type: String }], // array of strings
    certifications: [{ type: String }], // array of strings

    insurance: { type: String },
    phone: { type: String },
    email: { type: String },

    availability: { type: String }, // e.g. "Available Today"
    pincode: [{ type: String }],
    city: { type: String },

    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "services" }],
  },
  { timestamps: true }
);

const workerModel = mongoose.model("Workers", workerSchema);
module.exports = workerModel;
