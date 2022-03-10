import { getSession, useSession } from 'next-auth/react';
import React from 'react';

const AddressIndex = () => {
  const { data: session } = useSession();
  return (
    <main className='mt-5'>
      <h1 className='text-center text-3xl font-semibold tracking-wide text-gray-800 my-5'>
        Your Addresses
      </h1>
      <div className='max-w-7xl my-10 mx-auto '>
        {session?.userDetails?.addresses.map((address) => (
          <div className='border-2 grid gap-4 content-between w-full'></div>
        ))}
      </div>
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  if (!session.userDetails) {
    return {
      redirect: {
        destination: '/auth/user/details',
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
