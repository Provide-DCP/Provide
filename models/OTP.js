import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Types.ObjectId, ref: "Order" },
    value: {
      type: Number,
    },
    createdAt: { type: Date, default: Date.now, index: { expireAfterSeconds: 3600 * 24 } },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.otps || mongoose.model("Otps", otpSchema);
