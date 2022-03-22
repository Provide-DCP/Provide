/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Loader from "../Layouts/Loader";
import { useSession } from "next-auth/react";

export const RequestDetailsCard = ({ requestDetails }) => {
  const { data: session } = useSession();
  const [otp, setOtp] = useState(null);
  const [request, setRequest] = useState(requestDetails);

  useEffect(() => {
    if (session?.userDetails?.category === "volunteer") return;
    (async () => {
      const {
        data: { rotp },
      } = await axios.get("/api/rotp", {
        params: { requestId: request._id },
      });

      setOtp(rotp.value);
    })();
  }, [request, session]);

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
        {!request.finished ? (
          <div className=''>
            <div className='flex items-center'>
              <span className='text-2xl font-semibold mr-2'>OTP &#58; </span>
              {otp ? (
                <span className='text-2xl text-gray-500 font-bold'>{otp}</span>
              ) : (
                <span className='ml-2'>
                  <Loader height='6' width='6' color='gray' />
                </span>
              )}
            </div>
            <p className='text-sm font-semibold text-gray-500'>
              Share OTP to the provider while receiving order.
            </p>
          </div>
        ) : (
          <div>
            <div
              className={`inline-flex justify-center cursor-pointer py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700`}
            >
              Finished
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-col my-10 lg:flex-row mt-5 bg-white px-4 py-5 sm:p-6'>
        <div className='h-[300px] lg:h-[500px] w-full lg:w-[40%]'>
          <img
            src={request.userdetails.image}
            alt='product-image'
            className='rounded-md object-cover h-full w-full'
          />
        </div>
        <div className='grid content-between mt-5 lg:mt-0 lg:ml-10 w-full lg:w-[60%]'>
          <div>
            <h3 className='text-xl font-bold tracking-wide'>{request.category}</h3>
            <div className='flex flex-col lg:flex-row lg:justify-between flex-wrap mt-6'>
              <div className='w-full lg:w-[32%]  text-center my-2 lg:text-left lg:w-auto font-semibold text-gray-400 inline-block rounded-md shadow bg-gray-100 shadow p-4'>
                <h4 className='text-gray-800 mb-2'>Location</h4>
                {/* <p className="text-sm font-semibold tracking-wide">
                  {request.address.building}, {request.address.city}, {request.address.region},{" "}
                  {request.address.country}.
                </p> */}
              </div>
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
