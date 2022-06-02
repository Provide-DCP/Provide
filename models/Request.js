import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    userdetails: { type: mongoose.Schema.Types.ObjectId, ref: "Userdetail" },
    pending: {
      type: Boolean,
      required: true,
    },
    volunteer: { type: String },
    category: {
      type: String,
      required: true,
      default: "Emergency",
    },
    currentLocation: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    address: {
      name: {
        type: String,
      },
      phone: {
        type: Number,
      },
      pincode: {
        type: Number,
      },
      building: {
        type: String,
      },
      area: {
        type: String,
      },
      landmark: {
        type: String,
      },
      city: {
        type: String,
      },
      region: {
        type: String,
      },
      country: {
        type: String,
      },
      location: {
        latitude: {
          type: Number,
        },
        longitude: {
          type: Number,
        },
      },
    },
    location: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    finished: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Request || mongoose.model("Request", requestSchema);
