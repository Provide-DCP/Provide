import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const Index = ({ requests }) => {
  console.log(requests);
  const { data: session } = useSession();
  const router = useRouter();
  const handleAcceptRequest = async (req) => {
    try {
      const {
        data: { message, request },
      } = await axios.put("/api/requests", {
        request: {
          ...req,
          pending: false,
          volunteer: session.userId,
        },
      });
      if (request) {
        toast.success(message, { toastId: message });
        router.push("/dashboard/volunteer/active");
      } else {
        toast.error(message, { toastId: message });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="mt-20">
      <h1>Handle Requests</h1>
      {requests.map((request, index) => {
        return (
          <div key={index} className="mb-10">
            <p>{request.userdetails.firstName}</p>
            <p>{request.category}</p>
            <button onClick={() => handleAcceptRequest(request)}>accept</button>
          </div>
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
  } = await axios.get(process.env.HOST_URL + "/api/requests");

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
      requests,
    },
  };
};

export default Index;
