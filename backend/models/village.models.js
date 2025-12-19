import mongoose from "mongoose";

const villageSchema = new mongoose.Schema(
  {
    villageName: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    block: {
      type: String,
      required: true,
    },
    population: {
      type: Number,
      required: true,
    },
    scPopulation: {
      type: Number,
      required: true,
    },

    amenities: {
      waterSupply: {
        type: String,
        enum: ["Available", "Partial", "Not Available"],
        default: "Not Available",
      },
      electricity: {
        type: String,
        enum: ["Available", "Partial", "Not Available"],
        default: "Not Available",
      },
      roadConnectivity: {
        type: String,
        enum: ["Good", "Average", "Poor"],
        default: "Poor",
      },
      healthcare: {
        type: String,
        enum: ["Available", "Partial", "Not Available"],
        default: "Not Available",
      },
      school: {
        type: String,
        enum: ["Available", "Not Available"],
        default: "Not Available",
      },
      toilets: {
        type: String,
        enum: ["Available", "Not Available"],
        default: "Not Available",
      },
      internet: {
        type: String,
        enum: ["Available", "Not Available"],
        default: "Not Available",
      },
    },

    priorityScore: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    // Optional GeoJSON point for mapping (lon, lat)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: undefined,
      },
    },
  },
  { timestamps: true }
);

export const Village = mongoose.model("Village", villageSchema);
