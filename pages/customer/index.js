import { getSession } from "next-auth/react";
import React from "react";

const CustomerIndex = () => {
  return <main className='ml-[14%]'>CustomerIndex</main>;
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

  if (session.userDetails.category !== "customer") {
    return {
      redirect: {
        destination: `/dashboard/${session.userDetails.category}`,
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

  return {
    props: {
      session,
    },
  };
};

export default CustomerIndex;
