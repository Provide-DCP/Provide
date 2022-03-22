import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    userdetails: { type: mongoose.Schema.Types.ObjectId, ref: "Userdetail" },
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
    store: { type: mongoose.Types.ObjectId, ref: "Store" },
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

export default mongoose.models.Review || mongoose.model("Review", reviewsSchema);
