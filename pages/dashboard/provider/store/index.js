import React from 'react';
import { getSession } from 'next-auth/react';
import axios from 'axios';

const Store = ({ store }) => {
  console.log(store);
  return <main className='md:ml-[14%] mt-[2%] px-10'></main>;
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
