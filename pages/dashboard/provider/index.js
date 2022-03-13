import React, { useState } from "react";
import { getSession } from "next-auth/react";
import { Layout } from "../../../src/components/Dashboard/Layout";
import { Status } from "../../../src/components/Provider/Status";
import axios from "axios";
import { EmptyState } from "../../../src/components/Provider/EmptyState";
import Link from "next/link";

const flows = [
  { id: "01", name: "Create Store", href: "#", status: "current" },
  { id: "02", name: "Store Approval", href: "#", status: "upcoming" },
  { id: "03", name: "Add Product", href: "#", status: "upcoming" },
];

const Index = ({ store, products }) => {
  const [steps, setSteps] = useState(flows);
  console.log(products);
  if (store && steps[0].status !== "complete") {
    let newstate = flows;
    newstate[0].status = "complete";
    newstate[1].status = "current";
    setSteps([...newstate]);
  }

  if (store.approved && steps[1].status !== "complete") {
    let newstate = flows;
    newstate[1].status = "complete";
    newstate[2].status = "current";
    setSteps([...newstate]);
  }

  if (products.length > 0 && steps[2].status !== "complete") {
    let newstate = flows;
    newstate[2].status = "complete";
    setSteps([...newstate]);
  }

  if (
    steps[0].status === "complete" &&
    steps[1].status === "complete" &&
    steps[2].status === "complete"
  ) {
    return <>Store index page</>;
  }

  return (
    <main className="max-w-7xl mx-auto">
      <h1 className="text-start my-10 text-3xl font-bold uppercase text-gray-600">
        Setup Account
      </h1>
      <Status steps={steps} />
      <div className="my-20">
        {!store ? (
          <EmptyState />
        ) : !store.approved ? (
          "Please wait for approval"
        ) : (
          <>
            <p>add you first product</p>
            <Link href="/dashboard/provider/store/products/add">
              Add product
            </Link>
          </>
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
  if (session.userDetails.category !== "provider") {
    const category = session.userDetails.category;
    return {
      redirect: {
        destination:
          category === "customer"
            ? `/customer`
            : `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  const { data } = await axios.get("http://localhost:3000/api/store", {
    params: {
      userId: session.userId,
    },
  });
  const { store } = data;
  let products = [];
  if (store) {
    const { data } = await axios.get("http://localhost:3000/api/products", {
      params: {
        storeId: store._id,
      },
    });
    console.log(data);
    products = data.products;
  }

  return {
    props: {
      session,
      store,
      products,
    },
  };
};
export default Index;
