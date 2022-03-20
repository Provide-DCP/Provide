import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    store: { type: mongoose.Types.ObjectId, ref: "storeDetails" },
    product: { type: mongoose.Types.ObjectId, ref: "products" },
    customer: { type: mongoose.Types.ObjectId, ref: "customer" },
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
