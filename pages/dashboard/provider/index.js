/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Status } from "../../../src/components/Provider/Status";
import axios from "axios";
import { EmptyState } from "../../../src/components/Provider/EmptyState";
import Link from "next/link";
import { BiStore } from "react-icons/bi";
import { Stats } from "../../../src/components/Provider/Stats";
import { Chart } from "../../../src/components/Provider/Chart";
import { Header } from "../../../src/components/Layouts/Header";

const flows = [
  { id: "01", name: "Create Store", href: "#", status: "current" },
  { id: "02", name: "Store Approval", href: "#", status: "upcoming" },
  { id: "03", name: "Add Product", href: "#", status: "upcoming" },
];

const Index = ({ store, products, orders }) => {
  const [steps, setSteps] = useState(flows);
  const [values, setValues] = useState(null);
  useEffect(() => {
    let count = [0, 0, 0, 0, 0, 0];
    orders?.map((order) => {
      const time = new Date(order.createdAt);
      const today = new Date(Date.now());
      const day = time.getDate();
      const month = time.getMonth();
      const year = time.getFullYear();
      if (month === today.getMonth() && year === today.getFullYear())
        count[Math.ceil(day / 5) - 1] += 1;
    });
    setValues(count);

    const popper = document.getElementById("popper");
    const popperHead = document.getElementById("popperHead");
    const addProduct = document.getElementById("addProduct");
    setTimeout(() => {
      if (popper && popperHead && addProduct) {
        popper.classList.add("hidden");
        popperHead.classList.add("hidden");
        addProduct.classList.remove("hidden");
      }
    }, 3000);
  }, [orders]);

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
    return (
      <>
        <Header heading={"Dashboard"} />
        <main className="relative -mt-40">
          <div className="w-[86%] mx-auto flex text-base text-left w-full md:my-8 md:align-middle">
            <div className="rounded-lg shadow w-full relative bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="mt-5">
                  <Stats orders={orders} />
                  {values && (
                    <Chart
                      data={{
                        labels: ["0", "5", "15", "20", "25", "30"],
                        datasets: [
                          {
                            label: "Your Orders",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: "miter",
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: values,
                          },
                        ],
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <main className="  mt-[15vh] px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-start my-10 text-3xl font-bold uppercase text-gray-600">
          Setup Account
        </h1>
        <Status steps={steps} />
        <div className="my-10">
          {!store ? (
            <EmptyState heading="Add Store" link="/dashboard/provider/store/add" Icon={BiStore} />
          ) : !store.approved ? (
            <div className="w-full mt-5 flex flex-col items-center">
              <span className="relative inline-flex">
                <div className="inline-flex items-center px-4 py-2 text-center font-bold leading-6 text-lg md:text-4xl rounded-md text-gray-500 bg-white transition ease-in-out duration-150 ring-1 ring-slate-900/10 dark:ring-slate-200/20">
                  Please wait until our team approves your store.
                </div>
                <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
              </span>
              <img className="mx-auto" src="/loading.gif" alt="loading" />
            </div>
          ) : (
            <div className="relative">
              <h1
                data-aos="fade-up"
                id="popperHead"
                className="relative md:top-[100px] text-center text-lg md:text-3xl font-bold tracking-wide text-green-500"
              >
                Congratulations your store has been approved!
              </h1>
              <div id="popper" className="popper min-h-[440px]"></div>
              <div id="addProduct" className="hidden absolute w-full top-20">
                <EmptyState
                  heading="Add Product"
                  link="/dashboard/provider/products/add"
                  Icon={BiStore}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
         .popper {
            background-image: url(/popper-right.gif), url(/popper-left.gif);
            background-position: right, left;
            background-repeat: no-repeat;
          }
         
        }`}</style>
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
            ? `/customer/stores`
            : `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  const { data } = await axios.get(`${process.env.HOST_URL}/api/store?userId=${session.userId}`);
  const { store } = data;
  let products = [];
  let orderDetails = [];
  if (store) {
    const { data } = await axios.get(`${process.env.HOST_URL}/api/products?storeId=${store._id}`);
    products = data.products;

    const {
      data: { orders },
    } = await axios.get(`${process.env.HOST_URL}/api/orders?storeId=${store._id}`);
    orderDetails = orders;
  }

  return {
    props: {
      session,
      store,
      products,
      orders: orderDetails,
    },
  };
};
export default Index;
