import { getSession } from 'next-auth/react';
import React from 'react';

const AddressIndex = () => {
  return <h1>Hello</h1>;
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
