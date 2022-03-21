import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    userdetails: { type: mongoose.Schema.Types.ObjectId, ref: "userdetails" },
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

export default mongoose.models.reviews || mongoose.model("reviews", reviewsSchema);
