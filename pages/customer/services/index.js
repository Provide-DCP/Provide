import axios from "axios";
import { getSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { Header } from "../../../src/components/Layouts/Header";
import Loader from "../../../src/components/Layouts/Loader";
import { NoOrderProductState } from "../../../src/components/Shared/NoOrderProductState";
import { RequestDetailsCard } from "../../../src/components/Volunteer/RequestDetailsCard";

const ServicesIndex = ({ requests }) => {
  useEffect(() => {
    if (document !== undefined) {
      var animateButton = function (e) {
        e.preventDefault;
        e.target.classList.remove("animate");

        e.target.classList.add("animate");
        setTimeout(function () {
          e.target.classList.remove("animate");
        }, 700);
      };

      var bubblyButtons = document.getElementsByClassName("bubbly-button");

      for (var i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].addEventListener("click", animateButton, false);
      }
    }
  });
  return (
    <>
      <Header heading={"Get Help"} />
      <main className="relative -mt-40">
        <div className="w-[86%] mx-auto flex text-base text-left w-full md:my-8 md:align-middle">
          <div className="rounded-lg shadow w-full relative bg-gray-50 px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-5xl font-bold text-gray-800">Emergency help needed?</h1>
              <p className="my-5 text-2xl font-bold text-gray-500">Push the button</p>
              <Link href="/customer/services/add">
                <button className="mt-10 font-black shadow text-2xl bubbly-button">
                  Emergency
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[86%] mx-auto flex text-base text-left w-full md:my-8 md:align-middle">
          <div className="rounded-lg shadow w-full relative bg-gray-50 px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <h1 className="text-center text-3xl font-bold text-gray-600">
              Current Pending Requests
            </h1>
            {requests.length > 0 ? (
              requests.map((request, index) => {
                return <RequestDetailsCard key={index} requestDetails={request} />;
              })
            ) : (
              <div className="mt-10">
                <NoOrderProductState
                  heading={`Looks like you have no pending requests.`}
                  href="/customer/services"
                  image={"/empty_requests.svg"}
                  buttonText={"Go To Services"}
                />
              </div>
            )}
          </div>
        </div>
        <style jsx>{`
          .bubbly-button {
            font-family: "Helvetica", "Arial", sans-serif;
            display: inline-block;
            padding: 1em 2em;
            height: 250px;
            width: 250px;
            margin-bottom: 60px;
            -webkit-appearance: none;
            appearance: none;
            background-color: red;
            color: #fff;
            border-radius: 100%;
            border: none;
            cursor: pointer;
            position: relative;
            transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
            box-shadow: 0 2px 25px red;
          }
          .bubbly-button:focus {
            outline: 0;
          }
          .bubbly-button:before,
          .bubbly-button:after {
            position: absolute;
            content: "";
            display: block;
            width: 140%;
            height: 100%;
            left: -20%;
            z-index: -1000;
            transition: all ease-in-out 0.5s;
            background-repeat: no-repeat;
          }
          .bubbly-button:before {
            display: none;
            top: -75%;
            background-image: radial-gradient(circle, red 20%, transparent 20%),
              radial-gradient(circle, transparent 20%, red 20%, transparent 30%),
              radial-gradient(circle, red 20%, transparent 20%),
              radial-gradient(circle, red 20%, transparent 20%),
              radial-gradient(circle, transparent 10%, red 15%, transparent 20%),
              radial-gradient(circle, red 20%, transparent 20%),
              radial-gradient(circle, red 20%, transparent 20%),
              radial-gradient(circle, red 20%, transparent 20%),
              radial-gradient(circle, red 20%, transparent 20%);
            background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%,
              18% 18%;
          }
          .bubbly-button:after {
            display: none;
            bottom: -75%;
            background-image: radial-gradient(circle, #ff0081 20%, transparent 20%),
              radial-gradient(circle, #ff0081 20%, transparent 20%),
              radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%),
              radial-gradient(circle, #ff0081 20%, transparent 20%),
              radial-gradient(circle, #ff0081 20%, transparent 20%),
              radial-gradient(circle, #ff0081 20%, transparent 20%),
              radial-gradient(circle, #ff0081 20%, transparent 20%);
            background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
          }
          .bubbly-button:active {
            transform: scale(0.9);
            background-color: red;
            box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
          }
          .bubbly-button.animate:before {
            display: block;
            animation: topBubbles ease-in-out 0.75s forwards;
          }
          .bubbly-button.animate:after {
            display: block;
            animation: bottomBubbles ease-in-out 0.75s forwards;
          }
          @keyframes topBubbles {
            0% {
              background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%,
                55% 90%, 70% 90%;
            }
            50% {
              background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%,
                65% 20%, 90% 30%;
            }
            100% {
              background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%,
                65% 10%, 90% 20%;
              background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
            }
          }
          @keyframes bottomBubbles {
            0% {
              background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
            }
            50% {
              background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
            }
            100% {
              background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
              background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
            }
          }
        `}</style>
      </main>
    </>
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

  if (!session.userDetails) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }

  const {
    data: { requests },
  } = await axios.get(`${process.env.HOST_URL}/api/requests?userId=${session.userId}`);

  return {
    props: {
      session,
      requests,
    },
  };
};

export default ServicesIndex;
