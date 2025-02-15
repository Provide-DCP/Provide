import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { Header } from "../../../src/components/Layouts/Header";

const AddressIndex = () => {
  const { data: session } = useSession();
  return (
    <>
      <Header heading={"Your Addresses"} />
      <main className='relative -mt-40'>
        <div className='w-[86%] mx-auto flex text-base text-left w-full md:my-8 md:align-middle'>
          <div className='rounded-lg shadow w-full relative bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
            <div className='my-10 mx-auto grid grid-cols-3 gap-4 w-full'>
              <Link href={"/customer/address/add"}>
                <a className='flex flex-col items-center justify-center border-2 border-dashed border-gray-300 shadow-md rounded-md hover:bg-gray-50 w-80 h-64'>
                  <FaPlus color='#ccc' size={35} />
                  <h1 className='mt-2 text-lg font-bold text-gray-400'>Add Address</h1>
                </a>
              </Link>
              {session?.userDetails?.addresses.map((address) => (
                <div
                  key={address._id}
                  className='border rounded-md pb-4 px-5 shadow-md grid gap-4 content-between w-80 h-64'
                >
                  <div>
                    <h3 className='font-semibold py-3 text-center border-b-2'>{address.name}</h3>
                    <p className='text-sm mt-4 font-semibold text-gray-600'>
                      {address.building.length >= 35
                        ? `${address.building.slice(0, 35)}...`
                        : address.building}
                    </p>

                    <p className='text-sm my-1 font-semibold text-gray-600'>
                      {address.area.length >= 35 ? `${address.area.slice(0, 35)}...` : address.area}
                    </p>
                    <p className='text-sm my-1 uppercase font-semibold text-gray-600'>
                      {address.city}, {address.region} {address.pincode}
                    </p>
                    <p className='text-sm my-1 font-semibold text-gray-600'>{address.country}</p>
                    <p className='text-sm my-1 font-semibold text-gray-600'>
                      Phone Number: {address.phone}
                    </p>
                  </div>
                  <div className='flex'>
                    <Link href={`/customer/address/${address._id}/edit`}>
                      <a className='text-sm font-semibold text-blue-800 pr-5 border-r-2 border-gray-800 hover:text-blue-500'>
                        Edit
                      </a>
                    </Link>
                    <Link href={`/`}>
                      <a className='text-sm font-semibold text-blue-800 pl-5 hover:text-blue-500'>
                        Remove
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
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

  return {
    props: {
      session,
    },
  };
};

export default AddressIndex;
