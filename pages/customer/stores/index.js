import React from 'react';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { StoreCard } from '../../../src/components/Customer/StoreCard';

const StoreIndex = ({ stores }) => {
  console.log(stores);
  return (
    <main className='md:ml-[14%] mt-[2%] md:px-10'>
      <div className='bg-white'>
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='text-4xl font-bold tracking-tight text-gray-900'>
            Online Stores
          </h2>

          <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
            {stores.map((store, index) => (
              <StoreCard key={index} store={store} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data } = await axios.get('http://localhost:3000/api/store');
  const stores = data.store;

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

  if (session.userDetails.category !== 'customer') {
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
      stores,
    },
  };
};

export default StoreIndex;
