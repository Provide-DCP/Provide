import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

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
    <div className="mt-20">
      <h1>Complete Requests</h1>
      {requests &&
        requests.map((request, index) => {
          return (
            !request.finished && (
              <div key={index} className="mb-10">
                <p>{request.userdetails.firstName}</p>
                <p>{request.category}</p>
                <input
                  type="text"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md mr-2"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button onClick={() => handleVerify(request)}>finish</button>
              </div>
            )
          );
        })}
    </div>
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
