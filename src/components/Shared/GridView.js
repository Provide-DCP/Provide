/* eslint-disable @next/next/no-img-element */
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export const GridView = ({ products }) => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 xl:gap-x-5'>
      {products.map((product) => (
        <Link
          key={product._id}
          href={`${
            session.userDetails.category === 'provider'
              ? '/dashboard/provider'
              : '/customer/stores/' + router.query.id
          }/products/${product._id}`}
        >
          <a className='group relative cursor-pointer shadow rounded-md p-3'>
            <div className='w-full h-48 bg-gray-200 aspect-w-2 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-48 lg:aspect-none'>
              <img
                src={product.image}
                alt={'image'}
                className='w-full h-full object-center object-cover lg:w-full lg:h-full'
              />
            </div>
            <div className='mt-2 px-2 items-center flex justify-between'>
              <div>
                <h3 className='text-[18px] text-gray-700'>
                  <span aria-hidden='true' className='absolute inset-0' />
                  {product.name}
                </h3>
              </div>
              <p className='text-md font-semibold text-indigo-900'>
                {'Rs. ' + product.price}
              </p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};
