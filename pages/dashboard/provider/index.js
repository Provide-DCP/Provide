import React, { useState } from "react";
import { getSession } from "next-auth/react";
import { Layout } from "../../../src/components/Dashboard/Layout";
import { Status } from "../../../src/components/Provider/Status";
import axios from "axios";
import { EmptyState } from "../../../src/components/Provider/EmptyState";

const flows = [
  { id: "01", name: "Create Store", href: "#", status: "current" },
  { id: "02", name: "Store Approval", href: "#", status: "upcoming" },
  { id: "03", name: "Add Product", href: "#", status: "upcoming" },
];

const Index = ({ store }) => {
  const [steps, setSteps] = useState(flows);

  if (store && steps[0].status !== "complete") {
    let newstate = flows;
    newstate[0].status = "complete";
    setSteps([...newstate]);
  }

  if (store.approved && steps[1].status !== "complete") {
    let newstate = flows;
    newstate[1].status = "complete";
    setSteps([...newstate]);
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
          "add you first product"
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

  return {
    props: {
      session,
      store,
    },
  };
};
export default Index;
