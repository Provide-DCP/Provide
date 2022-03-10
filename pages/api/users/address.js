import connectDB from "../../../src/lib/connectDB.js";
import userDetails from "../../../models/UserDetailsModel";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchAddresses(req, res);
      break;
    case "POST":
      await addAddress(req, res);
      break;
    case "PUT":
      await updateAddress(req, res);
      break;
  }
}

const searchAddresses = async (req, res) => {
  try {
    await connectDB();
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const details = await userDetails.findOne({
      user: userId,
    });

    if (details) {
      return res
        .status(200)
        .json({ message: "Details Found", addresses: details.addresses });
    } else {
      return res.status(200).json({ message: "Details not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addAddress = async (req, res) => {
  try {
    await connectDB();

    const {
      userId,
      name,
      phone,
      pincode,
      building,
      area,
      landmark,
      city,
      region,
      country,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const details = await userDetails.findOne({
      user: userId,
    });
    details.addresses.push({
      name,
      phone,
      pincode,
      building,
      area,
      landmark,
      city,
      region,
      country,
    });

    const updatedAddresses = await userDetails.findOneAndUpdate(
      { user: userId },
      { addresses: details.addresses },
      { new: true }
    );
    res.json({
      message: "Address Created!",
      addresses: updatedAddresses.addresses,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    await connectDB();
    const {
      userId,
      name,
      phone,
      pincode,
      building,
      area,
      landmark,
      city,
      region,
      country,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const details = await userDetails.findOneAndUpdate(
      { user: userId },
      {
        name,
        phone,
        pincode,
        building,
        area,
        landmark,
        city,
        region,
        country,
      },
      { new: true }
    );
    if (details) {
      return res
        .status(200)
        .json({ message: "Address Updated!", addresses: details.addresses });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
