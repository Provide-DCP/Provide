<<<<<<< HEAD
import { getSession } from "next-auth/react";
import React from "react";

=======
import React from "react";
import { getSession } from "next-auth/react";
>>>>>>> 209401d0e75034c63ea9e610924e92cf7f1340e1
const ServicesIndex = () => {
  return <main className="ml-[14%]">ServicesIndex</main>;
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

export default ServicesIndex;
