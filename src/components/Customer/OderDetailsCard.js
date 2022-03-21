/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { ProductOption } from "../Provider/ProductOption";
import Loader from "../Layouts/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { FaDirections } from "react-icons/fa";
import { ProductOptionDisplay } from "../Shared/ProductOptionDisplay";
import { ReviewForm } from "./ReviewForm";

export const OrderDetailsCard = ({ orderDetails }) => {
  const { data: session } = useSession();
  const [otp, setOtp] = useState(null);
  const [order, setOrder] = useState(orderDetails);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  useEffect(() => {
    if (session?.userDetails?.category !== "customer") return;
    (async () => {
      const {
        data: { otp },
      } = await axios.get("/api/otp", {
        params: { orderId: order._id },
      });
      setOtp(otp.value);
    })();
  }, [order, session]);
  const statusClass = (index) => {
    if (index - order.status < 1) return "";
    if (index - order.status === 1) return "animateProgress";
    if (index - order.status > 1) return "undone";
  };
  const handleNext = async () => {
    if (order.status < 2) {
      const {
        data: { newstate },
      } = await axios.put("/api/orders", {
        ...order,
        status: order.status + 1,
      });
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
        } = await axios.put("/api/orders", {
          ...order,
          status: order.status + 1,
        });
        toast.success("Success! Correct OTP", {
          toastId: "Success! Correct OTP",
        });
        setOrder(newstate);
      } else {
        toast.error("Enter Correct OTP", { toastId: "Enter Correct OTP" });
      }
    }
  };
  const handleReviewCreate = async () => {
    try {
      const { data } = await axios.post("/api/reviews", {
        user: session.userId,
        product: order.product._id,
        store: order.store._id,
        rating: rating,
        review: review,
      });
      if (data.review) {
        setRating(0);
        setReview("");
        toast.success("Success! Review saved", {
          toastId: "Success! Correct saved",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="my-10 shadow rounded-lg mx-4 mt-4">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center flex-row px-2 pt-2 mx-4 border-b-2 border-gray-100">
        <div>
          <h1 className="text-3xl font-bold">Order Details</h1>
          <div className="flex flex-col lg:flex-row lg:items-center mt-2 mb-4">
            <p className="text-md font-semibold text-gray-400 mr-2">Order number</p>
            <p className="font-semibold">
              {order._id} &middot; {new Date(order.createdAt).toDateString()}
            </p>
          </div>
        </div>
        {session?.userDetails?.category === "customer" ? (
          order.status !== 4 ? (
            <div className="">
              <div className="flex items-center">
                <span className="text-2xl font-semibold mr-2">OTP &#58; </span>
                {otp ? (
                  <span className="text-2xl text-gray-500 font-bold">{otp}</span>
                ) : (
                  <span className="ml-2">
                    <Loader height="6" width="6" color="gray" />
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-gray-500">
                Share OTP to the provider while receiving order.
              </p>
            </div>
          ) : (
            <div>
              <ReviewForm
                rating={rating}
                review={review}
                setRating={setRating}
                setReview={setReview}
                handleCreate={handleReviewCreate}
              />
            </div>
          )
        ) : order.status < 3 ? (
          <div>
            {order.status === 2 && (
              <input
                type="text"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md mr-2"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            )}
            <div
              onClick={handleNext}
              className={`mb-2 inline-flex justify-center cursor-pointer py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700`}
            >
              {order.status < 2 ? "Next" : "Submit"}
            </div>
          </div>
        ) : (
          <div
            onClick={handleNext}
            className={`inline-flex justify-center cursor-pointer py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700`}
          >
            Finished
          </div>
        )}
      </div>
      <div className="flex flex-col my-10 lg:flex-row mt-5 bg-white px-4 py-5 sm:p-6">
        <div className="h-[300px] lg:h-[500px] w-full lg:w-[40%]">
          <img
            src={order.product.image}
            alt="product-image"
            className="rounded-md object-cover h-full w-full"
          />
        </div>
        <div className="grid content-between mt-5 lg:mt-0 lg:ml-10 w-full lg:w-[60%]">
          <div>
            <h3 className="text-xl font-bold tracking-wide">{order.product.name}</h3>
            <p className="my-1 text-md font-bold text-gray-600">Rs.{order.product.price}</p>
            <p className="text-md text-gray-500 my-2">
              {order.product.description.charAt(0).toUpperCase() +
                order.product.description.slice(1)}
            </p>
            <div>
              {order.variations.sizes.length > 0 && (
                <ProductOptionDisplay name="Size" options={order.variations.sizes} />
              )}
              {order.variations.colors.length > 0 && (
                <ProductOptionDisplay name="Color" options={order.variations.colors} />
              )}
              {order.variations.toppings.length > 0 && (
                <ProductOptionDisplay name="Topping" options={order.variations.toppings} />
              )}
              {order.variations.doses.length > 0 && (
                <ProductOptionDisplay name="Dose" options={order.variations.doses} />
              )}
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between flex-wrap mt-6">
              <div className="w-full lg:w-[32%]  text-center my-2 lg:text-left lg:w-auto font-semibold text-gray-400 inline-block rounded-md shadow bg-gray-100 shadow p-4">
                <h4 className="text-gray-800 mb-2">Pickup Address</h4>
                <p className="text-sm font-semibold tracking-wide">
                  {order?.store?.addresses[0]?.building}, {order?.store?.addresses[0]?.city},{" "}
                  {order?.store?.addresses[0]?.region}, {order?.store?.addresses[0]?.country}.
                </p>
              </div>
              <div className="w-full lg:w-[32%] text-center my-2 lg:text-left lg:w-auto font-semibold text-gray-400 inline-block rounded-md bg-gray-100 shadow p-4">
                <h4 className="text-gray-800 mb-2">Payment Information</h4>
                <p className="text-sm text-gray-600 tracking-wider">At Store</p>
                <p className="text-sm tracking-wider">Cash On Delivery</p>
              </div>
              <div className="w-full my-2 flex lg:w-[32%] flex-col text-gray-600 font-semibold justify-center lg:w-[40%] rounded-md bg-gray-100 shadow p-4">
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
