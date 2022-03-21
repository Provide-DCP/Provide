import axios from "axios";
import React from "react";
import { OrderDetailsCard } from "../../../src/components/Customer/OderDetailsCard";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { NoOrderProductState } from "../../../src/components/Shared/NoOrderProductState";

const Orders = ({ orders }) => {
  const { data: session } = useSession();
  return (
    <main className='md:ml-[14%]'>
      <h2 className='text-center my-10 text-4xl font-bold text-gray-600'>Store Orders</h2>
      <div className='flex flex-col'>
        {orders?.length > 0 ? (
          orders.map((order, index) => (
            <OrderDetailsCard key={index} orderDetails={order} session={session} />
          ))
        ) : (
          <NoOrderProductState
            heading={`Looks like you haven't made any order yet.`}
            href={"/customer/orders"}
            buttonText='Go To Stores'
            image='/empty_cart.svg'
          />
        )}
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

  const {
    data: { orders },
  } = await axios.get("http://localhost:3000/api/orders", {
    params: { userId: session.userId },
  });

  return {
    props: {
      orders,
      session,
    },
  };
};

export default Orders;
