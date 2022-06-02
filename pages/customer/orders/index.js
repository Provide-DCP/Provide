import axios from "axios";
import React from "react";
import { OrderDetailsCard } from "../../../src/components/Customer/OderDetailsCard";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { NoOrderProductState } from "../../../src/components/Shared/NoOrderProductState";
import { Header } from "../../../src/components/Layouts/Header";

const Orders = ({ orders }) => {
  const { data: session } = useSession();
  return (
    <main className=''>
      <Header heading={"Your Orders"} />
      <div className='relative -mt-40'>
        <div className='w-[86%] mx-auto flex text-base text-left w-full md:my-8 md:align-middle'>
          <div className='rounded-lg shadow w-full relative bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
            <div className='flex flex-col items-center justify-between w-full '>
              {orders?.length > 0 ? (
                orders.map((order, index) => (
                  <OrderDetailsCard key={index} orderDetails={order} session={session} />
                ))
              ) : (
                <NoOrderProductState
                  heading={`Looks like you haven't made any order yet.`}
                  href={"/customer/stores"}
                  buttonText='Go To Stores'
                  image='/empty_cart.svg'
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
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

  if (session.userDetails.category !== "customer") {
    return {
      redirect: {
        destination: `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  let orders = [];
  if (session) {
    const { data } = await axios.get(`${process.env.HOST_URL}/api/orders?userId=${session.userId}`);

    orders = data.orders;
  }

  return {
    props: {
      orders,
      session,
    },
  };
};

export default Orders;
