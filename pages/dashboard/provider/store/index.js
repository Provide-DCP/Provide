import React from 'react';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { Purpose } from '../../../../src/components/Provider/Purpose';
import { AiFillStar } from 'react-icons/ai';
import { FaDirections } from 'react-icons/fa';

const Store = ({ store }) => {
  return (
    <main className='md:ml-[14%] mt-[2%] px-10'>
      <div className='rounded-md max-w-[100%] mx-auto h-[450px] inset-0'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={store?.image}
          alt='store-image'
        />
      </div>
      <div className='mt-5 px-2 flex flex-col md:flex-row items-center justify-between'>
        <h1 className='text-4xl font-semibold text-gray-800'>{store?.name}</h1>
        <div className='flex items-center'>
          <div className='w-16 flex items-center justify-between px-3 rounded-md bg-green-600 mr-2 text-white py-1'>
            <span className='font-bold mr-1'>4.2</span>
            <AiFillStar />
          </div>
          <p className='text-sm font-semibold text-gray-600'>
            {' '}
            {store?.reviews?.length} <span>Reviews</span>
          </p>
        </div>
      </div>
      <div className='mt-2 px-3 flex flex-col'>
        <div className='text-xl font-light'>
          {store?.categories.map((category, index) => {
            if (store?.categories?.length !== index) {
              return <p>{category}</p>;
            } else {
              return <p>{category}, </p>;
            }
          })}
        </div>
        <div className='my-1 text-lg text-gray-400'>
          {store?.addresses[0]?.building}, {store?.addresses[0]?.city},{' '}
          {store?.addresses[0]?.region}, {store?.addresses[0]?.country}.
        </div>
      </div>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${store?.addresses[0]?.location?.latitude},${store?.addresses[0]?.location?.longitude}`}
        className='inline-flex items-center border-2 mx-2'
        target={`_blank`}
      >
        <FaDirections />
        <span className=''>Direction</span>
      </a>
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
