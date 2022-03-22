import mongoose from "mongoose";

const rotpSchema = new mongoose.Schema(
  {
    request: { type: mongoose.Types.ObjectId, ref: "requests" },
    value: {
      type: Number,
    },
    createdAt: { type: Date, default: Date.now, index: { expireAfterSeconds: 3600 * 24 } },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.rotps || mongoose.model("rotps", rotpSchema);
