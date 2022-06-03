/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Loader from "../Layouts/Loader";
import { useSession } from "next-auth/react";
import { FaDirections } from "react-icons/fa";

export const RequestDetailsCard = ({ requestDetails, handleAcceptRequest = () => {}, session }) => {
  const [otp, setOtp] = useState(null);
  const [request, setRequest] = useState(requestDetails);

  useEffect(() => {
    if (session?.userDetails?.category === "volunteer") return;
    (async () => {
      const {
        data: { rotp },
      } = await axios.get(`/api/rotp?requestId=${request._id}`);

      setOtp(rotp.value);
    })();
  }, [request, session]);

  return (
    <div className="my-10 shadow rounded-lg mx-4 mt-4">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center flex-row px-2 pt-2 mx-4 border-b-2 border-gray-100">
        <div>
          <h1 className="text-3xl font-bold">Request Details</h1>
          <div className="flex flex-col lg:flex-row lg:items-center mt-2 mb-4">
            <p className="text-md font-semibold text-gray-400 mr-2">Request number</p>
            <p className="font-semibold">
              {request._id} &middot; {new Date(request.createdAt).toDateString()}
            </p>
          </div>
        </div>
        {session?.userDetails?.category === "volunteer" ? (
          <div>
            <div
              onClick={() => handleAcceptRequest(request)}
              className={`my-2 w-full lg:w-auto lg:my-0 inline-flex justify-center cursor-pointer py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700`}
            >
              Accept
            </div>
          </div>
        ) : !request.finished ? (
          <div className="">
            <div className="flex items-center">
              <span className="text-2xl font-semibold mr-2">OTP &#58; </span>
              {otp ? (
                <span className="text-2xl text-gray-500 font-bold">{otp}</span>
              ) : (
                <span className="ml-2">
                  <Loader height="6" width="6" color="gray" />
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-gray-500">
              Share OTP to the provider while receiving order.
            </p>
          </div>
        ) : (
          <div>
            <div
              className={`my-2 w-full lg:w-auto lg:my-0 inline-flex justify-center cursor-pointer py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700`}
            >
              Finished
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col my-10 lg:flex-row justify-between items-center mt-5 bg-white px-4 py-4">
        <div className="lg:h-[10%] lg:w-[10%] rounded-full">
          <img
            src={request.userdetails?.image}
            alt="product-image"
            className="rounded-full object-cover h-full w-full"
          />
        </div>
        <div className="w-[90%] mt-5 lg:mt-0 lg:ml-10">
          <div className="flex flex-col items-center lg:flex-row lg:justify-between w-full">
            <div className="flex flex-col item-center justify-center">
              <h3 className="text-lg font-semibold tracking-wide">
                Name :-{" "}
                <span className="text-lg font-bold tracking-wide">
                  {request.userdetails?.firstName + " " + request.userdetails?.lastName}
                </span>
              </h3>
              <h3 className="text-lg font-semibold tracking-wide">
                Medical Issue :-{" "}
                <span className="text-lg font-bold tracking-wide">{request.category}</span>
              </h3>
            </div>
            <div className="w-full lg:w-[25%] flex flex-col lg:flex-row lg:justify-between flex-wrap">
              {request?.address && (
                <div className="text-center my-2 lg:text-left lg:w-auto font-semibold text-gray-400 inline-block rounded-md shadow bg-gray-100 shadow p-4">
                  <h4 className="text-gray-800 mb-2">Location</h4>
                  <p className="text-sm font-semibold tracking-wide">
                    {request.address.building}, {request.address.city}, {request.address.region},{" "}
                    {request.address.country}.
                  </p>
                </div>
              )}
              {session?.userDetails.category === "volunteer" && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${request?.currentLocation?.latitude},${request?.currentLocation.longitude}`}
                  target={"_blank"}
                  className="w-full justify-center inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  rel="noreferrer"
                >
                  Get Directions
                  <FaDirections className="ml-3 -mr-1 h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .animateProgress {
            animation: inProgress 1s ease infinite alternate;
          }

          @keyframes inProgress {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .undone {
            opacity: 0.3;
          }

          .undone .checkedIcon,
          .animateProgress .checkedIcon {
            display: none;
          }
        `}
      </style>
    </div>
  );
};
