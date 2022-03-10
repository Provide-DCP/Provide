/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MdEdit } from 'react-icons/md';
import { getSession, useSession } from 'next-auth/react';
import { Modal } from '../../../src/components/Layouts/Modal';

const tabs = [{ name: 'Profile', href: '#', current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Profile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  return (
    <React.Fragment>
      <Head>
        <title>Resume Builder | Profile</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className='flex-1 relative z-0 flex overflow-hidden'>
          <div className='flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last'>
            <div>
              <div>
                <img
                  className='h-32 w-full object-cover lg:h-48'
                  src='https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
                  alt='cover-image'
                />
              </div>
              <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='-mt-24 sm:-mt-24 sm:flex sm:items-end sm:space-x-5'>
                  <div className='flex'>
                    <Modal
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      openModal={openModal}
                      closeModal={closeModal}
                    />
                    {status === 'loading' ? (
                      <div className='animate-pulse flex space-x-4'>
                        <div className='rounded-full bg-gray-200 h-48 w-48'></div>
                      </div>
                    ) : (
                      <img
                        onClick={openModal}
                        className='h-48 w-48 rounded-full ring-4 ring-white sm:h-48 sm:w-48 object-cover'
                        src={session?.userDetails?.image}
                        alt='profile-image'
                      />
                    )}
                  </div>
                  <div className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
                    <div className='sm:hidden 2xl:block mt-6 min-w-0 flex-1'>
                      <h1 className='text-2xl capitalize font-bold text-gray-900 truncate'>
                        {session?.userDetails?.firstName}{' '}
                        {session?.userDetails?.lastName}
                      </h1>
                    </div>
                    <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                      <Link href='/dashboard/student/profile/edit'>
                        <button
                          type='button'
                          className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                        >
                          <MdEdit
                            className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                          <span>Edit Profile</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1'>
                  <h1 className='text-2xl font-bold text-gray-900 truncate'>
                    {session?.userDetails?.firstName}{' '}
                    {session?.userDetails?.lastName}
                  </h1>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className='max-w-6xl mx-auto mt-6 sm:mt-2 2xl:mt-5'>
              <div className='border-b border-gray-200'>
                <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
                    {tabs.map((tab) => (
                      <div
                        key={tab.name}
                        className={classNames(
                          tab.current
                            ? 'border-pink-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-md'
                        )}
                        aria-current={tab.current ? 'page' : undefined}
                      >
                        {tab.name}
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            <div className='mt-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden'>
              <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                <div className='sm:col-span-1'>
                  <dt className='capitalize text-md font-medium text-gray-500'>
                    First Name
                  </dt>
                  <dd className=' text-md font-semibold text-gray-900'>
                    {session?.userDetails?.firstName}
                  </dd>
                </div>
                <div className='sm:col-span-1'>
                  <dt className='capitalize text-md font-medium text-gray-500'>
                    Last Name
                  </dt>
                  <dd className=' font-semibold text-md text-gray-900'>
                    {session?.userDetails?.lastName}
                  </dd>
                </div>
                <div className='sm:col-span-1'>
                  <dt className='text-md font-medium text-gray-500'>Email</dt>
                  <dd className=' font-semibold text-md text-gray-900'>
                    {session?.user?.email}
                  </dd>
                </div>
                <div className='sm:col-span-1'>
                  <dt className='text-md font-medium text-gray-500'>
                    Mobile Number
                  </dt>
                  <dd className=' font-semibold text-md text-gray-900'>
                    {session?.userDetails?.phone}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
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
    return {
      redirect: {
        destination: `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
};

export default Profile;
