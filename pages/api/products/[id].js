import Product from "../../../models/Product";
import connectDB from "../../../src/lib/connectDB.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
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

    const { userId, productId, name, image, price, category, available, description, variations } =
      req.body;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        user: userId,
        name,
        image,
        price,
        category,
        available,
        description,
        variations,
      },
      { new: true }
    );
    if (product) {
      return res.status(200).json({ message: "Product Updated!", product });
    } else {
      return res.status(200).json({ message: "Please try again", product: false });
    }
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await connectDB();
    const productId = req.query.id;
    const product = await Product.findByIdAndDelete(productId);
    if (product) {
      return res.status(200).json({ message: "Product Deleted!", product });
    } else {
      return res.status(200).json({ message: "Please try again", product: false });
    }
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};
