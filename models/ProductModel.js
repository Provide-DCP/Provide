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
    variations: {
      sizes: [
        {
          name: String,
          price: String,
        },
      ],
      colors: [
        {
          name: String,
          price: String,
        },
      ],
      toppings: [
        {
          name: String,
          price: String,
        },
      ],
      doses: [
        {
          name: String,
          price: String,
        },
      ],
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

export default mongoose.models.products || mongoose.model("products", productSchema);
