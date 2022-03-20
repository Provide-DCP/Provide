import connectDB from "../../../src/lib/connectDB.js";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchOrders(req, res);
      break;
    case "POST":
      await createOrder(req, res);
      break;
    case "DELETE":
      await deleteOrder(req, res);
      break;
  }
}

const createOrder = async (req, res) => {
  try {
    await connectDB();

    const createOrder = new userDetails(req.body);

    await createOrder.save();
    res.json({
      message: "Success! Order Created",
      order: createOrder,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchOrders = async (req, res) => {
  try {
    await connectDB();
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const orders = await Order.find({
      user: userId,
    });

    if (orders) {
      return res.status(200).json({ message: "orders Found", orders });
    } else {
      return res.status(200).json({ message: "orders not found", orders: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await connectDB();

    const order = await Order.findByIdAndDelete(req.body.id);
    if (order) {
      return res.status(200).json({ message: "Order Deleted", order });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
