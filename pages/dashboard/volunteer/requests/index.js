import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Index = ({ requests }) => {
  console.log(requests);
  const { data: session } = useSession();
  const handleAcceptRequest = async (req) => {
    try {
      const { data: request } = await axios.put("/api/requests", {
        request: {
          ...req,
          pending: false,
          volunteer: session.userId,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return <p className="mt-20">handle Requests</p>;
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
