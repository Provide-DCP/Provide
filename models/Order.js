import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    store: { type: mongoose.Types.ObjectId, ref: "storeDetails" },
    product: { type: mongoose.Types.ObjectId, ref: "products" },
    customer: { type: mongoose.Types.ObjectId, ref: "customer" },
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

export default mongoose.models.orders || mongoose.model("orders", orderSchema);
