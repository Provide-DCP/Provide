/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { Purpose } from "../../../../src/components/Provider/Purpose";
import { AiFillStar } from "react-icons/ai";
import { FaDirections } from "react-icons/fa";

const Store = ({ store }) => {
  return (
    <main className="md:ml-[14%] mt-[2%] sm:px-10">
      <div className="rounded-md max-w-[100%] mx-auto h-[450px] inset-0">
        <img
          className="w-full h-full object-cover rounded-md"
          src={store?.image}
          alt="store-image"
        />
      </div>
      <div className="mt-5 px-2 flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-4xl font-semibold text-gray-800">{store?.name}</h1>
        <div className="flex items-center">
          <div className="my-2 md:my-0 w-16 flex items-center justify-between px-3 rounded-md bg-green-600 mr-2 text-white py-1">
            <span className="font-bold mr-1">0.0</span>
            <AiFillStar />
          </div>
          <p className="text-sm font-semibold text-gray-600">
            {" "}
            {store?.reviews?.length} <span>Reviews</span>
          </p>
        </div>
      </div>
      <div className="mt-2 px-3 flex flex-col">
        <div className="text-xl font-light mb-4 mt-2">
          {store?.categories.map((category, index) => {
            return (
              <p
                className="inline-block border rounded-md bg-gray-100 py-1 px-3 mr-3 text-base"
                key={index}
              >
                {category}
              </p>
            );
          })}
        </div>
        <div className="my-1 text-lg text-gray-400">
          {store?.addresses[0]?.building}, <br />
          {store?.addresses[0]?.city}
          <br />
          {store?.addresses[0]?.region}, {store?.addresses[0]?.country}.
        </div>
      </div>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${store?.addresses[0]?.location?.latitude},${store?.addresses[0]?.location?.longitude}`}
        className="inline-flex items-center border-2 mx-2 my-1 py-1 px-2 rounded-md text-red-400 hover:bg-gray-100
        "
        target={`_blank`}
      >
        <FaDirections />
        <span className="ml-2 text-gray-800">Direction</span>
      </a>
      <a
        href={`/dashboard/provider/store/edit`}
        className="inline-flex items-center border-2 mx-2 my-1 py-1 px-2 rounded-md text-red-400 hover:bg-gray-100
        "
      >
        <span className="ml-2 text-gray-800">Edit</span>
      </a>
      <div className="my-5">
        <h1 className="text-center text-3xl font-bold text-gray-500">Store Reviews</h1>
        <div className="my-10">
          {store?.reviews?.length === 0 ? (
            <p className="px-2 text-lg tracking-wide font-semibold text-gray-700">No Reviews Yet</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data } = await axios.get("http://localhost:3000/api/store", {
    params: {
      userId: session.userId,
    },
  });
  const { store } = data;

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

  if (session.userDetails.category !== "provider" || !store) {
    return {
      redirect: {
        destination: `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      store,
    },
  };
};

export default Store;
