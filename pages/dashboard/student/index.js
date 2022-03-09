import React from 'react';
import { getSession } from 'next-auth/react';
import { Layout } from '../../../src/components/Student/Dashboard/Layout';

const Index = () => {
  return (
    <div>
      <Layout />
    </div>
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
export default Index;
