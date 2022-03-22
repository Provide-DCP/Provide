import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../../../../src/components/Layouts/Header";
import Loader from "../../../../src/components/Layouts/Loader";
import { RequestDetailsCard } from "../../../../src/components/Volunteer/RequestDetailsCard";

const Index = ({ requestDetails }) => {
  const { data: session } = useSession();
  const [requests, setRequests] = useState(requestDetails);
  const [otp, setOtp] = useState("");
  const handleVerify = async (request) => {
    const {
      data: { verified },
    } = await axios.get("/api/rotp/verify", {
      params: {
        rotp: otp,
        requestId: request._id,
      },
    });
    if (verified) {
      await axios.put("/api/requests", {
        request: { ...request, finished: true },
      });
      const { data } = await axios.get("/api/requests", {
        params: { volunteerId: session.userId },
      });
      toast.success("Success! Request Completed", {
        toastId: "Success! Request Completed",
      });
      setRequests([...data.requests]);
    } else {
      toast.error("Enter Correct OTP", { toastId: "Enter Correct OTP" });
    }
  };
  return (
    <>
      <Header heading={"Requests"} />
      <main className="relative -mt-40">
        <div className="w-[86%] mx-auto flex text-base text-left w-full md:my-8 md:align-middle">
          <div className="rounded-lg shadow w-full relative bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="mt-20">
                <h1>Complete Requests</h1>
                {requests &&
                  requests.map((request, index) => {
                    return (
                      !request.finished && (
                        <div className="my-10 shadow rounded-lg mx-4 mt-4">
                          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center flex-row px-2 pt-2 mx-4 border-b-2 border-gray-100">
                            <div>
                              <h1 className="text-3xl font-bold">Request Details</h1>
                              <div className="flex flex-col lg:flex-row lg:items-center mt-2 mb-4">
                                <p className="text-md font-semibold text-gray-400 mr-2">
                                  Request number
                                </p>
                                <p className="font-semibold">
                                  {request._id} &middot;{" "}
                                  {new Date(request.createdAt).toDateString()}
                                </p>
                              </div>
                            </div>
                            <div>
                              <input
                                type="text"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md mr-2"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                              />
                              <div
                                onClick={() => handleVerify(request)}
                                className={`inline-flex justify-center cursor-pointer py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700`}
                              >
                                Close Request
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col my-10 lg:flex-row justify-between items-center mt-5 bg-white px-4 py-4">
                            <div className="h-[10%] w-[10%] rounded-full">
                              <img
                                src={request.userdetails.image}
                                alt="product-image"
                                className="rounded-full object-cover h-full w-full"
                              />
                            </div>
                            <div className="w-[90%] grid content-between mt-5 lg:mt-0 lg:ml-10">
                              <div className="flex justify-between w-full">
                                <div className="flex flex-col item-center justify-center">
                                  <h3 className="text-lg font-semibold tracking-wide">
                                    Name :-{" "}
                                    <span className="text-lg font-bold tracking-wide">
                                      {request.userdetails.firstName +
                                        " " +
                                        request.userdetails.lastName}
                                    </span>
                                  </h3>
                                  <h3 className="text-lg font-semibold tracking-wide">
                                    Medical Issue :-{" "}
                                    <span className="text-lg font-bold tracking-wide">
                                      {request.category}
                                    </span>
                                  </h3>
                                </div>
                                {request?.address && (
                                  <div className=" w-[25%] flex flex-col lg:flex-row lg:justify-between flex-wrap">
                                    <div className="text-center my-2 lg:text-left lg:w-auto font-semibold text-gray-400 inline-block rounded-md shadow bg-gray-100 shadow p-4">
                                      <h4 className="text-gray-800 mb-2">Location</h4>
                                      <p className="text-sm font-semibold tracking-wide">
                                        {request.address.building}, {request.address.city},{" "}
                                        {request.address.region}, {request.address.country}.
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    );
                  })}
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
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  if (!session.userDetails) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }

  const {
    data: { requests },
  } = await axios.get(process.env.HOST_URL + "/api/requests", {
    params: { volunteerId: session.userId },
  });

  if (session.userDetails.category !== "volunteer") {
    const category = session.userDetails.category;
    return {
      redirect: {
        destination:
          category === "customer"
            ? `/customer/stores`
            : `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      requestDetails: requests,
    },
  };
};

export default Index;
