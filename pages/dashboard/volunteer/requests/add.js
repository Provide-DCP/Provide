import axios from "axios";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const AddRequest = () => {
  const { data: session } = useSession();
  const [category, setCategory] = useState();
  const [address, setAddress] = useState();
  const handleCreateRequest = async () => {
    const {
      data: { request },
    } = await axios.post("/api/requests", {
      user: session.userId,
      userdetails: session.userDetails._id,
      pending: true,
      category,
      location: address,
      currentLocation: {
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
      },
    });
    if (request) {
      const {
        data: { rotp },
      } = await axios.post("/api/rotp", {
        request: request._id,
        value: Math.ceil(Math.random() * 1000000),
      });
      if (rotp) {
        toast.success("Success, Request Created!", { toastId: "Success, Request Created!" });
        router.push("/customer/orders");
      }
    }
  };
  return (
    <form onSubmit={handleCreateRequest}>
      <div>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div></div>
      <div></div>
    </form>
  );
};

export default AddRequest;
