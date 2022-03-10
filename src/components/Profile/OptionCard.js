import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const OptionCard = ({ logo, heading, description, href }) => {
  return (
    <Link href={href}>
      <a className='border-2 w-72 py-5 mr-5 mt-5 flex items-center justify-evenly rounded-md bg-white hover:bg-gray-100 shadow-sm'>
        <Image src={logo} width={50} height={50} alt='logo' />
        <div className='w-44'>
          <h4 className='text-lg font-semibold tracking-wide'>{heading}</h4>
          <p className='text-gray-600'>{description}</p>
        </div>
      </a>
    </Link>
  );
};
