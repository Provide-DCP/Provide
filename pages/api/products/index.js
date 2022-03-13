import connectDB from "../../../src/lib/connectDB.js";
import Product from "../../../models/ProductModel";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
  }
}

const searchProducts = async (req, res) => {
  try {
    await connectDB();
    const storeId = req.query.storeId;

    if (!storeId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const products = await Product.find({
      store: storeId,
    });

    if (store) {
      return res.status(200).json({ message: "products Found", products });
    } else {
      return res
        .status(200)
        .json({ message: "products not found", products: false });
    }
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    await connectDB();

    const {
      userId,
      storeId,
      name,
      image,
      price,
      category,
      available,
      description,
    } = req.body;

    if (!userId || !storeId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const product = new Product({
      user: userId,
      store: storeId,
      name,
      image,
      price,
      category,
      available,
      description,
    });

    await product.save();
    res.json({
      message: "Success! Product Created",
      product,
    });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};
