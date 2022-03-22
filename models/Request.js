import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    userdetails: { type: mongoose.Schema.Types.ObjectId, ref: "userdetails" },
    pending: {
      type: Boolean,
      required: true,
    },
    volunteer: { type: mongoose.Types.ObjectId, ref: "users" },
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
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
      building: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      region: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.requests || mongoose.model("requests", requestSchema);
