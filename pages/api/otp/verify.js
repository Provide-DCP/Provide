import connectDB from "../../../src/lib/connectDB.js";
import OTP from "../../../models/OTP";

export default async function handler(req, res) {
  await connectDB();
  const orderId = req.query.orderId,
    sentOtp = req.query.otp;
  const correctOtp = await OTP.findOne({ order: orderId });
  console.log(correctOtp);
  console.log(parseInt(sentOtp), parseInt(correctOtp.value));
  res.json({
    verified: parseInt(sentOtp) === parseInt(correctOtp.value),
  });
}
