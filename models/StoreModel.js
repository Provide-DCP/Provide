import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'users' },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
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
    cuisines: [
      {
        type: String,
        required: true,
      },
    ],
    approved: {
      type: String,
      required: true,
      default: false,
    },
    open: {
      type: Boolean,
      required: true,
      default: true,
    },
    timings: {
      start: {
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
      },
    },
    ratings: [
      {
        user: { type: mongoose.Types.ObjectId, ref: 'users' },
        rating: {
          type: Number,
          required: true,
        },
      },
    ],
    reviews: [
      {
        user: { type: mongoose.Types.ObjectId, ref: 'users' },
        review: {
          type: String,
          required: true,
        },
      },
    ],
    addresses: [
      {
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
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.storeSchema ||
  mongoose.model('store', storeSchema);
