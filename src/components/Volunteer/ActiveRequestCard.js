import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaDirections } from "react-icons/fa";

export const Active = ({ request, setRequests }) => {
  const { data: session } = useSession();
  const [otp, setOtp] = useState("");
  const handleVerify = async (request) => {
    const {
      data: { verified },
    } = await axios.get(`/api/rotp/verify?rotp=${otp}&requestId=${request._id}`);
    if (verified) {
      await axios.put(`/api/requests`, {
        request: { ...request, finished: true },
      });
      const { data } = await axios.get(`/api/requests?volunteerId=${session.userId}`);
      toast.success("Success! Request Completed", {
        toastId: "Success! Request Completed",
      });
      setRequests([...data.requests]);
    } else {
      toast.error("Enter Correct OTP", { toastId: "Enter Correct OTP" });
    }
  };
  return (
    <div className='my-10 shadow rounded-lg mx-4 mt-4'>
      <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center flex-row px-2 pt-2 mx-4 border-b-2 border-gray-100'>
        <div>
          <h1 className='text-3xl font-bold'>Request Details</h1>
          <div className='flex flex-col lg:flex-row lg:items-center mt-2 mb-4'>
            <p className='text-md font-semibold text-gray-400 mr-2'>Request number</p>
            <p className='font-semibold'>
              {request._id} &middot; {new Date(request.createdAt).toDateString()}
            </p>
          </div>
        </div>
        <div>
          <input
            type='text'
            className='my-2 w-full xl:my-0 xl:w-auto focus:ring-blue-500 focus:border-blue-500 shadow-sm sm:text-sm border-gray-300 rounded-md mr-2'
            placeholder='Enter OTP'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div
            onClick={() => handleVerify(request)}
            className={`my-2 w-full xl:w-auto xl:my-0 inline-flex justify-center cursor-pointer py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700`}
          >
            Close Request
          </div>
        </div>
      </div>
      <div className='flex flex-col my-10 lg:flex-row justify-between items-center mt-5 bg-white px-4 py-4'>
        <div className='lg:h-[10%] lg:w-[10%] rounded-full'>
          <img
            src={request.userdetails.image}
            alt='product-image'
            className='rounded-full object-cover h-full w-full'
          />
        </div>
        <div className='w-[90%] mt-5 lg:mt-0 lg:ml-10'>
          <div className='flex flex-col items-center lg:flex-row lg:justify-between w-full'>
            <div className='flex flex-col item-center justify-center'>
              <h3 className='text-lg font-semibold tracking-wide'>
                Name :-{" "}
                <span className='text-lg font-bold tracking-wide'>
                  {request.userdetails.firstName + " " + request.userdetails.lastName}
                </span>
              </h3>
              <h3 className='text-lg font-semibold tracking-wide'>
                Medical Issue :-{" "}
                <span className='text-lg font-bold tracking-wide'>{request.category}</span>
              </h3>
            </div>
            <div className='w-full lg:w-[25%] flex flex-col lg:flex-row lg:justify-between flex-wrap'>
              {request?.address && (
                <div className='text-center my-2 lg:text-left lg:w-auto font-semibold text-gray-400 inline-block rounded-md shadow bg-gray-100 shadow p-4'>
                  <h4 className='text-gray-800 mb-2'>Location</h4>
                  <p className='text-sm font-semibold tracking-wide'>
                    {request.address.building}, {request.address.city}, {request.address.region},{" "}
                    {request.address.country}.
                  </p>
                </div>
              )}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${request?.currentLocation?.latitude},${request?.currentLocation.longitude}`}
                target={"_blank"}
                className='w-full justify-center inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Get Directions
                <FaDirections className='ml-3 -mr-1 h-5 w-5' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
