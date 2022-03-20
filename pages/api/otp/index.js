import connectDB from "../../../src/lib/connectDB.js";
import OTP from "../../../models/OTP";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchOtp(req, res);
      break;
    case "POST":
      await createOtp(req, res);
      break;
  }
}

const createOtp = async (req, res) => {
  try {
    await connectDB();

    const createOtp = new OTP(req.body);

    await createOtp.save();
    res.json({
      message: "Success! Otp Created",
      otp: createOtp,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchOtp = async (req, res) => {
  try {
    await connectDB();
    const orderId = req.query.orderId;

    if (!orderId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const otp = await OTP.findOne({
      order: orderId,
    });

    if (otp) {
      return res.status(200).json({ message: "otp Found", otp });
    } else {
      return res.status(200).json({ message: "otp not found", otp: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
