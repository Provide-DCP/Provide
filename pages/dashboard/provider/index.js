import React, { useState } from 'react';
import { getSession } from 'next-auth/react';
import { Layout } from '../../../src/components/Dashboard/Layout';
import { Status } from '../../../src/components/Provider/Status';
import axios from 'axios';
import { EmptyState } from '../../../src/components/Provider/EmptyState';

const flows = [
  { id: '01', name: 'Create Store', href: '#', status: 'complete' },
  { id: '02', name: 'Store Approval', href: '#', status: 'current' },
  { id: '03', name: 'Add Product', href: '#', status: 'upcoming' },
];

const Index = ({ store }) => {
  const [steps, setSteps] = useState(flows);
  <h1 className='text-start my-10 text-3xl font-bold uppercase text-gray-600'>
    Setup Account
  </h1>;
  if (!store)
    return (
      <main className='max-w-7xl mx-auto'>
        <div className='my-20'>
          <EmptyState />
        </div>
      </main>
    );

  return <main className='max-w-7xl mx-auto'>Hello</main>;
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  // const store = await axios.get('http://localhost:3000/api/store', {
  //   params: {
  //     userId: session.userId,
  //   },
  // });

  const store = false;

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

  if (!session.userDetails) {
    return {
      redirect: {
        destination: '/auth/user/details',
        permanent: false,
      },
    };
  }

  if (session.userDetails.category !== 'provider') {
    const category = session.userDetails.category;
    return {
      redirect: {
        destination:
          category === 'customer'
            ? `/customer`
            : `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      store,
    },
  };
};
export default Index;
