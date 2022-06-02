import React from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { StoreCard } from "../../../src/components/Customer/StoreCard";
import { Heading } from "../../../src/components/Layouts/Heading";
import { Header } from "../../../src/components/Layouts/Header";

const StoreIndex = ({ stores }) => {
  return (
    <>
      <Header heading={"Online Stores"} />
      <main className='relative -mt-40'>
        <div className='w-[86%] mx-auto flex text-base text-left w-full md:my-8 md:align-middle'>
          <div className='rounded-lg shadow w-full relative bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
            <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
              <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
                {stores.map((store, index) => (
                  <StoreCard key={index} store={store} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data } = await axios.get(`${process.env.HOST_URL}/api/store`);
  const stores = data.store;

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

  if (session.userDetails.category !== "customer") {
    const category = session.userDetails.category;
    return {
      redirect: {
        destination:
          category === "customer" ? `/customer` : `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      stores,
    },
  };
};

export default StoreIndex;
