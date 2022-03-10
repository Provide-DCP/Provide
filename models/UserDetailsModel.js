import mongoose from 'mongoose';

const userDetailsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'users' },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      default: 'customer',
    },
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
            required: true,
          },
          longitude: {
            type: Number,
            required: true,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.userDetails ||
  mongoose.model('userDetails', userDetailsSchema);
