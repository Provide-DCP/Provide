import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
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
    total: {
      type: String,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
