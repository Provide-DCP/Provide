import connectDB from "../../../src/lib/connectDB.js";
import Product from "../../../models/ProductModel";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
  }
}

const getProduct = async (req, res) => {
  try {
    await connectDB();
    const productId = req.query.id;

    if (!productId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const product = await Product.findById(productId);

    if (product) {
      return res.status(200).json({ message: "product Found", product });
    } else {
      return res.status(200).json({ message: "product not found", product: false });
    }
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    await connectDB();

    const { userId, storeId, name, image, price, category, available, description, variations } =
      req.body;

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
      variations,
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
