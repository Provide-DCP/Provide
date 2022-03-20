/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { ProductOption } from "../Provider/ProductOption";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const OrderDetailsCard = ({ orderDetails }) => {
  const { data: session } = useSession();
  const [otp, setOtp] = useState("");
  const [order, setOrder] = useState(orderDetails);
  const router = useRouter();
  useEffect(() => {
    if (session?.userDetails?.category !== "customer") return;
    (async () => {
      const {
        data: { otp },
      } = await axios.get("/api/otp", { params: { orderId: order._id } });
      setOtp(otp.value);
    })();
  }, []);
  const statusClass = (index) => {
    if (index - order.status < 1) return "";
    if (index - order.status === 1) return "animateProgress";
    if (index - order.status > 1) return "undone";
  };
  const handleNext = async () => {
    if (order.status < 2) {
      const {
        data: { newstate },
      } = await axios.put("/api/orders", { ...order, status: order.status + 1 });
      setOrder(newstate);
    } else {
      const {
        data: { verified },
      } = await axios.get("/api/otp/verify", {
        params: {
          otp: otp,
          orderId: order._id,
        },
      });
      if (verified) {
        const {
          data: { newstate },
        } = await axios.put("/api/orders", { ...order, status: order.status + 1 });
        toast.success("Enter Correct OTP", { toastId: "Enter Correct OTP" });
        setOrder(newstate);
      } else {
        toast.error("Success! Correct OTP", { toastId: "Success! Correct OTP" });
      }
    }
  };
  return (
    <div className="my-10 shadow rounded-lg mx-4 mt-4">
      <div className="flex justify-between items-center flex-row px-2 pt-2 mx-4 border-b-2 border-gray-100">
        <div>
          <h1 className="text-3xl font-bold">Order Details</h1>
          <div className="flex items-center mt-2 mb-4">
            <p className="text-md font-semibold text-gray-400 mr-2">Order number</p>
            <p className="font-semibold">{order._id}</p>
            <span className="mx-4 text-gray-400">&middot;</span>
            <p className="font-semibold">{new Date(order.createdAt).toDateString()}</p>
          </div>
        </div>
        {session?.userDetails?.category === "customer" ? (
          <div className="">
            <div className="flex items-center">
              <span className="text-2xl font-semibold mr-2">OTP &#58; </span>
              <span className="text-2xl text-gray-500 font-bold">{otp}</span>
            </div>
            <p className="text-sm font-semibold text-gray-500">
              Share OTP to the provider while receiving order.
            </p>
          </div>
        ) : order.status < 3 ? (
          <div>
            {order.status === 2 && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            )}
            <div
              onClick={handleNext}
              className={` ml-3 inline-flex justify-center cursor-pointer py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700`}
            >
              {order.status < 2 ? "Next" : "Submit"}
            </div>
          </div>
        ) : (
          <div
            onClick={handleNext}
            className={` ml-3 inline-flex justify-center cursor-pointer py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700`}
          >
            Finished
          </div>
        )}
      </div>
      <div className="flex my-10 flex-row mt-5 bg-white px-4 py-5 sm:p-6">
        <div className="h-[500px] w-[40%]">
          <img
            src={order.product.image}
            alt="product-image"
            className="rounded-md object-cover h-full w-full"
          />
        </div>
        <div className="grid content-between ml-10 w-[60%]">
          <div>
            <h3 className="text-xl font-bold tracking-wide">{order.product.name}</h3>
            <p className="my-1 text-md font-bold text-gray-600">Rs.{order.product.price}</p>
            <p className="text-md text-gray-500 my-2">
              {order.product.description.charAt(0).toUpperCase() +
                order.product.description.slice(1)}
            </p>
            <div>
              {order.variations.sizes.length > 0 && (
                <ProductOption
                  name="Size"
                  options={order.variations.sizes}
                  selected={""}
                  setSelected={() => {}}
                />
              )}
              {order.variations.colors.length > 0 && (
                <ProductOption
                  name="Color"
                  options={order.variations.colors}
                  selected={""}
                  setSelected={() => {}}
                />
              )}
              {order.variations.toppings.length > 0 && (
                <ProductOption
                  name="Topping"
                  options={order.variations.toppings}
                  selected={""}
                  setSelected={() => {}}
                />
              )}
              {order.variations.doses.length > 0 && (
                <ProductOption
                  name="Dose"
                  options={order.doses.sizes}
                  selected={""}
                  setSelected={() => {}}
                />
              )}
            </div>
            <div className="flex justify-between flex-wrap mt-6">
              <div className="font-semibold text-gray-400  inline-block rounded-md bg-gray-100 shadow p-4">
                <h4 className="text-gray-800 mb-2">Delivery Address</h4>
                <p className="text-sm tracking-wider">{order.store.addresses[0].area}</p>
                <p className="text-sm tracking-wider">{order.store.addresses[0].city}</p>
                <p className="text-sm tracking-wider">{order.store.addresses[0].region}</p>
              </div>
              <div className="font-semibold text-gray-400 inline-block rounded-md bg-gray-100 shadow p-4">
                <h4 className="text-gray-800 mb-2">Payment Information</h4>
                <p className="text-sm text-gray-600 tracking-wider">Online</p>
                <p className="text-sm tracking-wider">Cash On Delivery</p>
              </div>
              <div className="flex flex-col text-gray-600 font-semibold justify-center w-[40%]  rounded-md bg-gray-100 shadow p-4">
                <div className="border-b border-gray-300 flex justify-between">
                  <p>Total</p>
                  <p>Rs.{order.total}</p>
                </div>
                <div className="border-b mt-2 border-gray-300 flex justify-between">
                  <p>Discount</p>
                  <p>Rs.0</p>
                </div>
                <div className="border-b mt-2 border-gray-300 flex justify-between">
                  <p>Sub Total</p>
                  <p>Rs.100</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap justify-between items-center">
            <div className={`${statusClass(0)} flex flex-col justify-center items-center`}>
              <Image
                width={40}
                height={40}
                src="/img/bake.png"
                className=""
                alt="processing-image"
              />
              <span className="my-1">Processing</span>
              <div className="checkedIcon">
                <Image
                  className="checkedIcon"
                  src="/img/checked.png"
                  width={20}
                  height={20}
                  alt="checked-image"
                />
              </div>
            </div>
            <div className={`${statusClass(1)} flex flex-col justify-center items-center`}>
              <Image width={40} height={40} src="/img/bike.png" className="" alt="ready-image" />
              <span className="my-1">Ready</span>
              <div className="checkedIcon">
                <Image
                  className="checkedIcon"
                  src="/img/checked.png"
                  width={20}
                  height={20}
                  alt="checked-image"
                />
              </div>
            </div>
            <div className={`${statusClass(2)} flex flex-col justify-center items-center`}>
              <Image width={40} height={40} src="/img/paid.png" className="" alt="paid-image" />
              <span className="my-1">Paid</span>
              <div className="checkedIcon">
                <Image
                  className="checkedIcon"
                  src="/img/checked.png"
                  width={20}
                  height={20}
                  alt="checked-image"
                />
              </div>
            </div>
            <div className={`${statusClass(3)} flex flex-col justify-center items-center`}>
              <Image
                width={40}
                height={40}
                src="/img/delivered.png"
                className="delivered-image"
                alt="delivered-image"
              />
              <span className="my-1">Delivered</span>
              <div className="checkedIcon">
                <Image
                  className="checkedIcon"
                  src="/img/checked.png"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .animateProgress {
            animation: inProgress 1s ease infinite alternate;
          }

          @keyframes inProgress {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .undone {
            opacity: 0.3;
          }

          .undone .checkedIcon,
          .animateProgress .checkedIcon {
            display: none;
          }
        `}
      </style>
    </div>
  );
};
