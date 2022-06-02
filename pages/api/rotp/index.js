import ROTP from "../../../models/ROTP";
import connectDB from "../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchRotp(req, res);
      break;
    case "POST":
      await createRotp(req, res);
      break;
  }
}

const createRotp = async (req, res) => {
  try {
    await connectDB();

    const createOtp = new ROTP(req.body);

    await createOtp.save();
    res.json({
      message: "Success! Otp Created",
      rotp: createOtp,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchRotp = async (req, res) => {
  try {
    await connectDB();
    const requestId = req.query.requestId;

    if (!requestId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const rotp = await ROTP.findOne({
      request: requestId,
    });

    if (rotp) {
      return res.status(200).json({ message: "rotp Found", rotp });
    } else {
      return res.status(200).json({ message: "rotp not found", rotp: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
