import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../../../../src/components/Layouts/Header";
import Loader from "../../../../src/components/Layouts/Loader";
import { NoOrderProductState } from "../../../../src/components/Shared/NoOrderProductState";
import { Active } from "../../../../src/components/Volunteer/ActiveRequestCard";
import { RequestDetailsCard } from "../../../../src/components/Volunteer/RequestDetailsCard";

const Index = ({ requestDetails }) => {
  const { data: session } = useSession();
  const [requests, setRequests] = useState(requestDetails);

  return (
    <>
      <Header heading={"Active Requests"} />
      <main className='relative -mt-40'>
        <div className='w-[86%] mx-auto flex text-base text-left w-full md:my-8 md:align-middle'>
          <div className='rounded-lg shadow w-full relative bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
              {requests.length > 0 ? (
                requests.map((request, index) => {
                  return (
                    !request.finished && <Active request={request} setRequests={setRequests} />
                  );
                })
              ) : (
                <NoOrderProductState
                  heading={`Looks like you haven't accepted any request.`}
                  href={"/dashboard/volunteer/requests"}
                  buttonText='Go To Requests'
                  image='/empty-active-request.svg'
                />
              )}
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

  const {
    data: { requests },
  } = await axios.get(process.env.HOST_URL + "/api/requests", {
    params: { volunteerId: session.userId },
  });

  if (session.userDetails.category !== "volunteer") {
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

  return {
    props: {
      requestDetails: requests,
    },
  };
};

export default Index;
