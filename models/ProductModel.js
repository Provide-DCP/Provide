import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    store: { type: mongoose.Types.ObjectId, ref: "store" },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: "true",
    },
    description: {
      type: String,
      required: true,
    },
    ratings: [
      {
        user: { type: mongoose.Types.ObjectId, ref: "users" },
        rating: {
          type: Number,
          required: true,
        },
      },
    ],
    reviews: [
      {
        user: { type: mongoose.Types.ObjectId, ref: "users" },
        review: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.productSchema ||
  mongoose.model("products", productSchema);
