import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Types.ObjectId, ref: "orders" },
    value: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.otps || mongoose.model("otps", otpSchema);
