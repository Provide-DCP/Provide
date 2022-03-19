import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { MenuAlt1Icon, XIcon } from '@heroicons/react/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Layout = () => {
  return (
    <>
      {/* Background color split screen for large screens */}
      <div className='relative top-10 min-h-screen flex flex-col'>
        {/* 3 column wrapper */}
        <div className='flex-grow w-full max-w-full mx-auto xl:px-2 lg:flex'>
          {/* Left sidebar & main wrapper */}
          <div className='flex-1 min-w-0 bg-white xl:flex'>
            <div className='border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-80 bg-white'>
              <div className='h-full pl-4 py-6 sm:pl-6 lg:pl-8 xl:pl-0'>
                {/* Start left column area */}
                <div
                  className='h-full relative bg-red-200'
                  style={{ minHeight: '12rem' }}
                >
                  <div className='absolute inset-0 border-2 border-gray-200 border-dashed rounded-lg' />
                </div>
                {/* End left column area */}
              </div>
            </div>

            <div className='bg-white lg:min-w-0 lg:flex-1'>
              <div className='h-full py-6 px-4 sm:px-6 lg:px-4'>
                {/* Start main area*/}
                <div className='relative h-full' style={{ minHeight: '36rem' }}>
                  <div className='absolute inset-0 border-2 border-gray-200 border-dashed rounded-lg' />
                </div>
                {/* End main area */}
              </div>
            </div>
          </div>

          <div className='border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-80 bg-white'>
            <div className='h-full pl-4 py-6 sm:pl-6 lg:pl-8 xl:pl-0'>
              {/* Start left column area */}
              <div
                className='h-full relative bg-red-200'
                style={{ minHeight: '12rem' }}
              >
                <div className='absolute inset-0 border-2 border-gray-200 border-dashed rounded-lg' />
              </div>
              {/* End left column area */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
