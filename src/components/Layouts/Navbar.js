/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { LoginDropdown } from './LoginDropdown';
import Loader from './Loader';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Navbar = () => {
  const router = useRouter();

  const [current, setCurrent] = useState(
    router.pathname.split('/').length > 3
      ? router.pathname.split('/')[3]
      : router.pathname.split('/')[1]
  );

  const { data: session, status } = useSession();

  useEffect(() => {
    if (router.pathname) toggleNav(current);
  }, [router, router.pathname]);

  const toggleNav = (id) => {
    if (typeof document === undefined || typeof current === undefined) return;
    const active = 'border-indigo-500 text-gray-900';
    const nonActive =
      'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700';
    const previous = document.getElementById(current);
    const selected = document.getElementById(id);

    if (!previous || !selected) return;
    active.split(' ').forEach((item) => {
      previous.classList.remove(item);
      selected.classList.add(item);
    });
    nonActive.split(' ').forEach((item) => {
      previous.classList.add(item);
      selected.classList.remove(item);
    });
    setCurrent(id);
  };

  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex'>
                <Link href='/'>
                  <div className='flex-shrink-0 flex items-center'>
                    <img
                      className='block lg:hidden h-8 w-auto'
                      src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                      alt='Workflow'
                    />
                    <img
                      className='hidden lg:block h-8 w-auto'
                      src='https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg'
                      alt='Workflow'
                    />
                  </div>
                </Link>
                <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                  <Link href={`/dashboard/${session?.userDetails?.category}`}>
                    <a
                      id='dashboard'
                      onClick={() => toggleNav('dashboard')}
                      className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium'
                    >
                      Dashboard
                    </a>
                  </Link>
                  <Link
                    href={`/dashboard/${session?.userDetails?.category}/resumes`}
                  >
                    <a
                      id='resumes'
                      onClick={() => toggleNav('resumes')}
                      className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium'
                    >
                      Resumes
                    </a>
                  </Link>
                  <Link
                    href={`/dashboard/${session?.userDetails?.category}/jobs`}
                  >
                    <a
                      id='jobs'
                      onClick={() => toggleNav('jobs')}
                      className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium'
                    >
                      Jobs
                    </a>
                  </Link>
                </div>
              </div>

              <div className='hidden sm:ml-6 sm:flex sm:items-center'>
                <button
                  type='button'
                  className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                <div className='hidden sm:ml-6 sm:flex sm:items-center'>
                  {status === 'loading' ? (
                    <div className='animate-pulse flex space-x-4'>
                      <div className='rounded-full bg-gray-300 h-8 w-8'></div>
                    </div>
                  ) : (
                    <img
                      className='h-8 w-8 object-fill rounded-full'
                      src={session?.userDetails?.image}
                      alt='profile-image'
                    />
                  )}
                </div>

                {/* Profile dropdown */}
                <LoginDropdown />
              </div>
              <div className='-mr-2 flex items-center sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='pt-2 pb-3 space-y-1'>
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as='a'
                href='#'
                className='bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as='a'
                href='#'
                className='border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as='a'
                href='#'
                className='border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as='a'
                href='#'
                className='border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              >
                Calendar
              </Disclosure.Button>
            </div>
            <div className='pt-4 pb-3 border-t border-gray-200'>
              <div className='flex items-center px-4'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-10 w-10 rounded-full'
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt=''
                  />
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium text-gray-800'>
                    Tom Cook
                  </div>
                  <div className='text-sm font-medium text-gray-500'>
                    tom@example.com
                  </div>
                </div>
                <button
                  type='button'
                  className='ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>
              <div className='mt-3 space-y-1'>
                <Disclosure.Button
                  as='a'
                  href='#'
                  className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as='a'
                  href='#'
                  className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as='a'
                  href='#'
                  className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
