import React from 'react';
import { OrderDetailsCard } from '../../../src/components/Customer/OderDetailsCard';

const Orders = () => {
  return (
    <main className='md:ml-[14%]'>
      <h2 className='text-center my-10 text-4xl font-bold text-gray-600'>
        Your Orders
      </h2>
      <div className='flex flex-col'>
        <OrderDetailsCard />
        <OrderDetailsCard />
      </div>
    </main>
  );
};

export default Orders;
