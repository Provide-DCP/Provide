/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const ListView = ({ products }) => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className='flex flex-col max-w-11/12 mx-auto'>
      {products.map((product, index) => (
        <Link
          key={index}
          href={`${
            session.userDetails.category === "provider"
              ? "/dashboard/provider"
              : "/customer/stores/" + router.query.id
          }/products/${product._id}`}
        >
          <a className='flex flex-col md:flex-row my-5 md:items-center rounded-md shadow p-2'>
            <img
              className='w-80 md:mr-10 h-48 object-cover rounded-md'
              src={product.image}
              alt=''
            />
            <div className='w-full mt-4 md:mt-0 md:w-2/3'>
              <h2 className='text-xl mb-1 font-bold tracking-wide'>{product.name}</h2>
              <h3 className='text-blue-700 text-lg font-semibold'>{"Rs. " + product.price}</h3>
              <p className='mt-1 mb-3 text-gray-600'>
                {product.description.charAt(0).toUpperCase() + product.description.slice(1)}
              </p>
              <a className='inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer'>
                Details
              </a>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};
