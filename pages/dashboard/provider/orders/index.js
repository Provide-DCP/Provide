import axios from "axios";
import React from "react";
import { OrderDetailsCard } from "../../../../src/components/Customer/OderDetailsCard";
import { getSession } from "next-auth/react";
import { NoOrderProductState } from "../../../../src/components/Shared/NoOrderProductState";
const Orders = ({ orders }) => {
  return (
    <main className="md:ml-[14%]">
      <h2 className="text-center my-10 text-4xl font-bold text-gray-600">Your Orders</h2>
      <div className="flex flex-col">
        {orders?.length > 0 ? (
          orders.map((order, index) => <OrderDetailsCard key={index} orderDetails={order} />)
        ) : (
          <NoOrderProductState
            heading={`Looks like no one have made any order from your store yet.`}
            href={"/dashboard/provider"}
            buttonText="Go To Dashboard"
            image="/empty_cart.svg"
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

  const { data } = await axios.get(process.env.HOST_URL + "/api/store", {
    params: {
      userId: session.userId,
    },
  });
  const { store } = data;

  const {
    data: { orders },
  } = await axios.get(process.env.HOST_URL + "/api/orders", {
    params: { storeId: store._id },
  });

  if (session.userDetails.category !== "provider" || !store || !store.approved) {
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
      orders,
    },
  };
};

export default Orders;
