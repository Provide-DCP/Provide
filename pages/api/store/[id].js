import connectDB from "../../../src/lib/connectDB.js";
import Store from "../../../models/Store.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchStore(req, res);
      break;
  }
}

const searchStore = async (req, res) => {
  try {
    await connectDB();
    const storeId = req.query.id;

    if (!storeId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const store = await Store.findById(storeId);

    if (store) {
      return res.status(200).json({ message: "store Found", store });
    } else {
      return res.status(200).json({ message: "store not found", store: false });
    }
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};
