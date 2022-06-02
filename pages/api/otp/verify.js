import OTP from "../../../models/OTP";
import connectDB from "../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  await connectDB();
  const orderId = req.query.orderId,
    sentOtp = req.query.otp;
  const correctOtp = await OTP.findOne({ order: orderId });
  res.json({
    verified: parseInt(sentOtp) === parseInt(correctOtp.value),
  });
}
