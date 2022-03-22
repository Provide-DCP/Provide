import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: String,
        required: true,
      },
    ],
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
    open: {
      type: Boolean,
      required: true,
      default: true,
    },
    timings: {
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
    },
    addresses: [
      {
        name: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        pincode: {
          type: String,
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
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Store || mongoose.model("Store", storeSchema);
