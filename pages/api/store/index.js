import connectDB from "../../../src/lib/connectDB.js";
import Store from "../../../models/StoreModel";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchStore(req, res);
      break;
    case "POST":
      await createStore(req, res);
      break;
    case "PUT":
      await updateStore(req, res);
      break;
  }
}

const searchStore = async (req, res) => {
  try {
    await connectDB();
    const userId = req.query.userId;
    console.log(userId);
    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const store = await Store.findOne({
      user: userId,
    });

    if (details) {
      return res.status(200).json({ message: "store Found", store });
    } else {
      return res.status(200).json({ message: "store not found" });
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

    const store = new Store({
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
    return res.status(200).json({ message: error.message });
  }
};

const updateStore = async (req, res) => {
  try {
    await connectDB();
    const { user } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const details = await userDetails.findOneAndUpdate(
      { user: user },
      req.body,
      { new: true }
    );
    if (details) {
      return res.status(200).json({ message: "Store Updated", details });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
