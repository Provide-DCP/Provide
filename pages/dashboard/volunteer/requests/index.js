import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { Header } from "../../../../src/components/Layouts/Header";
import { NoOrderProductState } from "../../../../src/components/Shared/NoOrderProductState";
import { RequestDetailsCard } from "../../../../src/components/Volunteer/RequestDetailsCard";

const Index = ({ requests }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleAcceptRequest = async (req) => {
    try {
      const {
        data: { message, newstate },
      } = await axios.put("/api/requests", {
        request: {
          ...req,
          pending: false,
          volunteer: session.userId,
        },
      });
      if (newstate) {
        toast.success("Request Accepted", { toastId: "Request Accepted" });
        router.push("/dashboard/volunteer/active");
      } else {
        toast.error("Please try again", { toastId: "Please try again" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Header heading={"Customer Requests"} />
      <main className='relative -mt-40'>
        <div className='w-[86%] mx-auto flex text-base text-left w-full md:my-8 md:align-middle'>
          <div className='rounded-lg shadow w-full relative bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
              <div className=''>
                {requests.length > 0 ? (
                  requests.map((request, index) => {
                    return (
                      !request.finished && (
                        <RequestDetailsCard
                          key={index}
                          requestDetails={request}
                          handleAcceptRequest={handleAcceptRequest}
                          session={session}
                        />
                      )
                    );
                  })
                ) : (
                  <NoOrderProductState
                    heading={`Looks like there are no customer requests.`}
                    href={"/dashboard/volunteer"}
                    buttonText='Go To Dashboard'
                    image='/empty_requests.svg'
                  />
                )}
              </div>
            </div>
          </div>
        </div>
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
  } = await axios.get(process.env.HOST_URL + "/api/requests");

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
      requests,
      session,
    },
  };
};

export default Index;
