import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    store: { type: mongoose.Types.ObjectId, ref: "Store" },
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.products || mongoose.model("Product", productSchema);
