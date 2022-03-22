import connectDB from "../../../src/lib/connectDB.js";
import Request from "../../../models/Request";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await searchRequests(req, res);
      break;
    case "POST":
      await createRequest(req, res);
      break;
    case "PUT":
      await updateRequest(req, res);
      break;
    case "DELETE":
      await deleteRequest(req, res);
      break;
  }
}

const createRequest = async (req, res) => {
  try {
    await connectDB();

    const createRequest = new Request(req.body);

    await createRequest.save();
    res.json({
      message: "Success! Request Created",
      request: createRequest,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchRequests = async (req, res) => {
  try {
    await connectDB();
    const volunteerId = req.query.volunteerId;
    const userId = req.query.userId;
    let requests = [];
    if (volunteerId) {
      requests = await Request.find({ pending: false, volunteer: volunteerId })
        .populate("userdetails")
        .sort({ createdAt: -1 });
    } else if (userId) {
      requests = await Request.find({ user: userId })
        .populate("userdetails")
        .sort({ createdAt: -1 });
    } else {
      requests = await Request.find({ pending: true })
        .populate("userdetails")
        .sort({ createdAt: -1 });
    }

    if (requests) {
      return res.status(200).json({ message: "requests Found", requests });
    } else {
      return res.status(200).json({ message: "requests not found", requests: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateRequest = async (req, res) => {
  const request = await Request.findByIdAndUpdate(req.body.request._id, req.body.request, {
    new: true,
  })
    .populate("userdetails")
    .sort({ createdAt: -1 });
  return res.status(200).json({ message: "Request Updated", newstate: request });
};

const deleteRequest = async (req, res) => {
  try {
    await connectDB();

    const request = await Request.findByIdAndDelete(req.body.id);
    if (request) {
      return res.status(200).json({ message: "Request Deleted", request });
    } else {
      return res.status(200).json({ message: "Please try again!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
