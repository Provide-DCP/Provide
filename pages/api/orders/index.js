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
    case "PUT":
      await updateOrder(req, res);
      break;
    case "DELETE":
      await deleteOrder(req, res);
      break;
  }
}

const createOrder = async (req, res) => {
  try {
    await connectDB();

    const createOrder = new Order(req.body);

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
    const storeId = req.query.storeId;
    let orders = [];
    if (userId) {
      orders = await Order.find({ user: userId })
        .populate("store")
        .populate("product")
        .sort({ createdAt: -1 });
    } else if (storeId) {
      orders = await Order.find({ store: storeId })
        .populate("store")
        .populate("product")
        .sort({ createdAt: -1 });
    }

    if (orders) {
      return res.status(200).json({ message: "orders Found", orders });
    } else {
      return res.status(200).json({ message: "orders not found", orders: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  const orderId = req.body._id;
  const order = await Order.findByIdAndUpdate(orderId, req.body, { new: true })
    .populate("store")
    .populate("product")
    .sort({ createdAt: -1 });
  return res.status(200).json({ message: "Order Updated", newstate: order });
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
