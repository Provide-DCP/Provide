import connectDB from "../../../src/lib/connectDB.js";
import StoreDetails from "../../../models/StoreDetailsModel.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchStore(req, res);
      break;
    case "POST":
      await createStore(req, res);
      break;
  }
}

const searchStore = async (req, res) => {
  try {
    await connectDB();
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const store = await StoreDetails.findOne({
      user: userId,
    });

    if (store) {
      return res.status(200).json({ message: "store Found", store });
    } else {
      return res.status(200).json({ message: "store not found", store: false });
    }
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};

const createStore = async (req, res) => {
  try {
    await connectDB();

    const {
      userId,
      name,
      image,
      email,
      purpose,
      categories,
      cuisines,
      approved,
      open,
      timings,
      addresses,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const store = new StoreDetails({
      user: userId,
      name,
      image,
      email,
      purpose,
      categories,
      cuisines,
      approved,
      open,
      timings,
      addresses,
    });

    await store.save();
    res.json({
      message: "Success! Store Created",
      store,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
