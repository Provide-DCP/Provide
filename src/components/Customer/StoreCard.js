import Link from 'next/link';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';

export const StoreCard = ({ store }) => {
  return (
    <Link key={store._id} href={`/customer/stores/${store._id}`}>
      <a className='rounded-lg shadow border hover:shadow-md p-3 group relative cursor-pointer'>
        <div className='w-92 min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-56 lg:aspect-none'>
          <img
            src={store.image}
            alt={store.name}
            className='w-full h-full object-center object-cover lg:w-full lg:h-full'
          />
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <div className='w-[65%]'>
            <h3 className='text-lg font-bold text-gray-600'>{store.name}</h3>
          </div>
          <div className='w-[20%]'>
            <div className='my-2 md:my-0 w-16 flex items-center justify-between px-2 rounded-md bg-green-600 text-white py-1'>
              <span className='font-bold mr-1'>0.0</span>
              <AiFillStar />
            </div>
          </div>
        </div>
        <div className='mt-4 pt-2 flex flex-wrap border-t border-gray-200'>
          {store?.categories?.map((category, index) => {
            return (
              <p
                className='inline-block border rounded-md bg-gray-100 py-1 px-3 mr-3 text-base'
                key={index}
              >
                {category}
              </p>
            );
          })}
        </div>
      </a>
    </Link>
  );
};
