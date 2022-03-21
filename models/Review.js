import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    product: { type: mongoose.Types.ObjectId, ref: "products" },
    store: { type: mongoose.Types.ObjectId, ref: "stores" },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.reviews || mongoose.model("reviews", productSchema);
