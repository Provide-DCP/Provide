import React from 'react';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { Purpose } from '../../../../src/components/Provider/Purpose';

const Store = ({ store }) => {
  return (
    <main className='md:ml-[14%] mt-[2%] px-10'>
      <div className='rounded-md max-w-7xl h-[450px] inset-0'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={store?.image}
          alt='store-image'
        />
      </div>
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data } = await axios.get('http://localhost:3000/api/store', {
    params: {
      userId: session.userId,
    },
  });
  const { store } = data;

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

  if (session.userDetails.category !== 'provider' || !store) {
    return {
      redirect: {
        destination: `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      store,
    },
  };
};

export default Store;
