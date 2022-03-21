import connectDB from "../../../src/lib/connectDB.js";
import Review from "../../../models/Review";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchReviews(req, res);
      break;
    case "POST":
      await createReview(req, res);
      break;
  }
}

const createReview = async (req, res) => {
  try {
    await connectDB();

    const createReview = new Review(req.body);

    await createReview.save();
    res.json({
      message: "Success! review Created",
      review: createReview,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchReviews = async (req, res) => {
  try {
    await connectDB();
    const userdetailsId = req.query.userdetailsId;
    const storeId = req.query.storeId;
    const productId = req.query.productId;
    let reviews = [];

    if (userdetailsId) {
      reviews = await Review.find({ userdetails: userdetailsId })
        .populate("userdetails")
        .sort({ createdAt: -1 });
    } else if (storeId) {
      reviews = await Review.find({ store: storeId })
        .populate("userdetails")
        .sort({ createdAt: -1 });
    } else if (productId) {
      reviews = await Review.find({ product: productId })
        .populate("userdetails")
        .sort({ createdAt: -1 });
    }

    if (reviews) {
      return res.status(200).json({ message: "reviews Found", reviews });
    } else {
      return res.status(200).json({ message: "reviews not found", reviews: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
