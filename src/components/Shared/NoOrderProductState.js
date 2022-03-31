import Link from "next/link";
import React from "react";

export const NoOrderProductState = ({ heading, href, image, buttonText }) => {
  return (
    <div className='px-5 flex flex-col items-center justify-center'>
      <img className='w-full sm:w-[70%] md:w-[50%] lg:w-[30%]' src={image} alt='' />
      <p className='my-5 font-bold text-lg lg:text-3xl text-gray-700 text-center'>{heading}</p>
      <Link href={href}>
        <a className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 '>
          {buttonText}
        </a>
      </Link>
    </div>
  );
};
