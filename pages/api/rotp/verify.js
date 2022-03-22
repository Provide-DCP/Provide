import connectDB from "../../../src/lib/connectDB.js";
import ROTP from "../../../models/ROTP";

export default async function handler(req, res) {
  await connectDB();
  const requestId = req.query.requestId,
    sentOtp = req.query.rotp;
  const correctRotp = await ROTP.findOne({ request: requestId });
  res.json({
    verified: parseInt(sentOtp) === parseInt(correctRotp.value),
  });
}
