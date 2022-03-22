import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaCheckCircle } from "react-icons/fa";
import Loader from "../../../src/components/Layouts/Loader";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const AddRequest = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState({});
  const [location, setLocation] = useState({
    loading: false,
    coordinates: { latitude: null, longitude: null },
  });
  const handlelocation = () => {
    setLocation({
      loading: true,
    });

    const onSuccess = (location) => {
      setLocation({
        loading: false,
        coordinates: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    };

    const onError = (error) => {
      toast.error(error.message, { toastId: error.message });
      setLocation({
        loading: true,
        error,
      });
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation doesn't support your browser.",
      });
    }
  }, []);
  const handleCreateRequest = async (e) => {
    e.preventDefault();
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
    <form onSubmit={handleCreateRequest} className="mt-28">
      <div>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div></div>
      <div className="mt-4 grid grid-cols-6 gap-6 border-t py-5">
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
            Latitude
          </label>
          <input
            type="text"
            name="latitude"
            id="latitude"
            required
            value={location.coordinates?.latitude || ""}
            onChange={(e) =>
              setLocation({
                ...location,
                coordinates: {
                  ...coordinates,
                  latitude: e.target.value,
                },
              })
            }
            autoComplete="lat"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
            Longitude
          </label>
          <input
            type="text"
            name="longitude"
            id="longitude"
            required
            value={location.coordinates?.longitude || ""}
            onChange={(e) =>
              setLocation({
                ...location,
                coordinates: {
                  ...coordinates,
                  longitude: e.target.value,
                },
              })
            }
            autoComplete="long"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="my-5 relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 bg-white text-sm text-gray-500">OR</span>
        </div>
      </div>
      <div>
        <div
          onClick={handlelocation}
          disabled={location.coordinates?.latitude && location.coordinates?.longitude}
          className="w-full flex justify-center border border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-200 cursor-pointer"
        >
          {!location.loading ? (
            location.coordinates?.latitude && location.coordinates?.longitude ? (
              <div className="py-2 px-4 flex justify-center items-center cursor-not-allowed w-full">
                <FaCheckCircle size={24} color={"green"} />
                <p className="ml-3 text-base">Location Granted</p>
              </div>
            ) : (
              <div className="py-2 px-4 flex justify-center items-center hover:bg-gray-300 w-full">
                Grant Location Permission
              </div>
            )
          ) : (
            <div className="py-2 px-4 flex justify-center items-center cursor-not-allowed w-full">
              <Loader width={6} height={6} color="white" />
              <p>Fetching...</p>
            </div>
          )}
        </div>
      </div>
      <button type="submit">submit</button>
    </form>
  );
};

export default AddRequest;
