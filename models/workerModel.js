const mongoose = require("mongoose");

const workerDetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Full name of worker
    verified: { type: Boolean, default: false }, // Admin verified or not
    email: { type: String, required: true, unique: true }, // User's email address
    svcDesc: { type: String, required: true }, // e.g., "Electrician"
    experience: { type: String }, // e.g., "8 yrs"
    rating: { type: Number, default: 0 }, // Avg. rating
    reviewCount: { type: Number, default: 0 }, // Number of reviews
    completedJobs: { type: Number, default: 0 }, // Completed jobs count

    phone: { type: String, required: true }, // Primary contact

    city: { type: String, required: true },
    pincode: { type: String }, // Serviceable areas

    workerWage: { type: Number }, // Minimum service charge
    languages: [{ type: String }], // e.g., ["Hindi", "Bhojpuri"]
    workType: {
      type: String,
      enum: ["Individual", "Team"],
      default: "Individual",
    },

    profilePhoto: { type: String }, // Image URL
    idProofVerified: { type: Boolean, default: false }, // Aadhaar / Voter ID verified
    bio: { type: String, required: true }, // Short description
    status: { type: String, enum: ["active", "inactive"], default: "active" },

    service: { type: mongoose.Schema.Types.ObjectId, ref: "services" }, // Link to services
  },
  { timestamps: true }
);

const workerDetailsModel = mongoose.model("workerDetails", workerDetSchema);

const workerSchema = new mongoose.Schema(
  {
    details: { type: mongoose.Schema.Types.ObjectId, ref: "workerDetails" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const workerModel = mongoose.model("workers", workerSchema);

module.exports = { workerModel, workerDetailsModel };
