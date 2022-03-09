import connectDB from "../../../src/lib/connectDB.js";
import userDetails from "../../../models/UserDetailsModel";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchUserDetails(req, res);
      break;
    case "POST":
      await createUserDetails(req, res);
      break;
    case "PUT":
      await updateUserDetails(req, res);
      break;
  }
}

const createUserDetails = async (req, res) => {
  try {
    await connectDB();

    const { firstName, lastName, category, email, phone, userId, image } =
      req.body;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const createUserDetails = new userDetails({
      user: userId,
      firstName,
      lastName,
      category,
      emailList: [email],
      image: image || "/favicon.ico",
      phone,
    });

    await createUserDetails.save();
    res.json({
      message: "Success! User Details Created",
      details: createUserDetails,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchUserDetails = async (req, res) => {
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
      return res.status(200).json({ message: "Details Found", details });
    } else {
      return res.status(200).json({ message: "Details not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    await connectDB();
    const { firstName, lastName, email, userId, image } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const details = await userDetails.findOneAndUpdate(
      { user: userId },
      {
        firstName,
        lastName,
        emailList: [email],
        image,
      },
      { new: true }
    );
    if (details) {
      return res.status(200).json({ message: "Details Updated", details });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
