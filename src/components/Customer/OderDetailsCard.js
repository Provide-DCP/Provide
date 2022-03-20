import React from 'react';
import Image from 'next/image';

export const OrderDetailsCard = () => {
  const status = 0;

  const statusClass = (index) => {
    if (index - status < 1) return '';
    if (index - status === 1) return 'animateProgress';
    if (index - status > 1) return 'undone';
  };
  return (
    <div className='my-10 shadow rounded-lg mx-4 mt-4'>
      <div className='flex justify-between items-center flex-row px-2 pt-2 mx-4 border-b-2 border-gray-100'>
        <div>
          <h1 className='text-3xl font-bold'>Order Details</h1>
          <div className='flex items-center mt-2 mb-4'>
            <p className='text-md font-semibold text-gray-400 mr-2'>
              Order number
            </p>
            <p className='font-semibold'>W086438792</p>
            <span className='mx-4 text-gray-400'>&middot;</span>
            <p className='font-semibold'>March 22, 2021</p>
          </div>
        </div>
        <div className=''>
          <div className='flex items-center'>
            <span className='text-2xl font-semibold mr-2'>OTP &#58; </span>
            <span className='text-2xl text-gray-500 font-bold'>231102</span>
          </div>
          <p className='text-sm font-semibold text-gray-500'>
            Share OTP to the provider while receiving order.
          </p>
        </div>
      </div>
      <div className='flex my-10 flex-row mt-5 bg-white px-4 py-5 sm:p-6'>
        <div className='h-[500px] w-[40%]'>
          <img
            src='https://b.zmtcdn.com/data/pictures/3/93043/0307c6fdb751054fb51f876bb913cc16.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*'
            alt='product-image'
            className='rounded-md object-cover h-full w-full'
          />
        </div>
        <div className='grid content-between ml-10 w-[60%]'>
          <div>
            <h3 className='text-xl font-bold tracking-wide'>
              Distant Mountains Artwork Tee
            </h3>
            <p className='my-1 text-md font-bold text-gray-600'>Rs.30</p>
            <p className='text-md text-gray-500 my-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              consectetur consequatur saepe fugiat voluptatum harum. Cumque ipsa
              deserunt, tempora, illum omnis quis dignissimos iusto illo debitis
              voluptatibus ab dolor at.
            </p>
            <div className='flex justify-between flex-wrap mt-6'>
              <div className='font-semibold text-gray-400  inline-block rounded-md bg-gray-100 shadow p-4'>
                <h4 className='text-gray-800 mb-2'>Delivery Address</h4>
                <p className='text-sm tracking-wider'>Chintalkunta Checkpost</p>
                <p className='text-sm tracking-wider'>Hyderabad</p>
                <p className='text-sm tracking-wider'>Telangana</p>
              </div>
              <div className='font-semibold text-gray-400 inline-block rounded-md bg-gray-100 shadow p-4'>
                <h4 className='text-gray-800 mb-2'>Payment Information</h4>
                <p className='text-sm text-gray-600 tracking-wider'>Online</p>
                <p className='text-sm tracking-wider'>Ending with 4242</p>
                <p className='text-sm tracking-wider'>Expires 02/24</p>
              </div>
              <div className='flex flex-col text-gray-600 font-semibold justify-center w-[40%]  rounded-md bg-gray-100 shadow p-4'>
                <div className='border-b border-gray-300 flex justify-between'>
                  <p>Total</p>
                  <p>Rs.100</p>
                </div>
                <div className='border-b mt-2 border-gray-300 flex justify-between'>
                  <p>Discount</p>
                  <p>Rs.0</p>
                </div>
                <div className='border-b mt-2 border-gray-300 flex justify-between'>
                  <p>Sub Total</p>
                  <p>Rs.100</p>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-5 flex flex-wrap justify-between items-center'>
            <div
              className={`${statusClass(
                0
              )} flex flex-col justify-center items-center`}
            >
              <Image
                width={40}
                height={40}
                src='/img/bake.png'
                className=''
                alt='processing-image'
              />
              <span className='my-1'>Processing</span>
              <div className='checkedIcon'>
                <Image
                  className='checkedIcon'
                  src='/img/checked.png'
                  width={20}
                  height={20}
                  alt='checked-image'
                />
              </div>
            </div>
            <div
              className={`${statusClass(
                1
              )} flex flex-col justify-center items-center`}
            >
              <Image
                width={40}
                height={40}
                src='/img/bike.png'
                className=''
                alt='ready-image'
              />
              <span className='my-1'>Ready</span>
              <div className='checkedIcon'>
                <Image
                  className='checkedIcon'
                  src='/img/checked.png'
                  width={20}
                  height={20}
                  alt='checked-image'
                />
              </div>
            </div>
            <div
              className={`${statusClass(
                2
              )} flex flex-col justify-center items-center`}
            >
              <Image
                width={40}
                height={40}
                src='/img/paid.png'
                className=''
                alt='paid-image'
              />
              <span className='my-1'>Paid</span>
              <div className='checkedIcon'>
                <Image
                  className='checkedIcon'
                  src='/img/checked.png'
                  width={20}
                  height={20}
                  alt='checked-image'
                />
              </div>
            </div>
            <div
              className={`${statusClass(
                3
              )} flex flex-col justify-center items-center`}
            >
              <Image
                width={40}
                height={40}
                src='/img/delivered.png'
                className='delivered-image'
                alt='delivered-image'
              />
              <span className='my-1'>Delivered</span>
              <div className='checkedIcon'>
                <Image
                  className='checkedIcon'
                  src='/img/checked.png'
                  width={20}
                  height={20}
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .animateProgress {
            animation: inProgress 1s ease infinite alternate;
          }

          @keyframes inProgress {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .undone {
            opacity: 0.3;
          }

          .undone .checkedIcon,
          .animateProgress .checkedIcon {
            display: none;
          }
        `}
      </style>
    </div>
  );
};
