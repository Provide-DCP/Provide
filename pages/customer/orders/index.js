import axios from 'axios';
import React from 'react';
import { OrderDetailsCard } from '../../../src/components/Customer/OderDetailsCard';
import { getSession, useSession } from 'next-auth/react';

const Orders = ({ orders }) => {
  const { data: session } = useSession();
  return (
    <main className='md:ml-[14%]'>
      <h2 className='text-center my-10 text-4xl font-bold text-gray-600'>
        Store Orders
      </h2>
      <div className='flex flex-col'>
        {orders &&
          orders.map((order, index) => (
            <OrderDetailsCard
              key={index}
              orderDetails={order}
              session={session}
            />
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

  const {
    data: { orders },
  } = await axios.get('http://localhost:3000/api/orders', {
    params: { userId: session.userId },
  });

  return {
    props: {
      orders,
      session,
    },
  };
};

export default Orders;
