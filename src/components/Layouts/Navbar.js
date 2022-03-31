/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import Loader from "./Loader";
import { Popover, Transition } from "@headlessui/react";
import {
  ChartBarIcon,
  CursorClickIcon,
  DocumentReportIcon,
  MenuIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  XIcon,
  HomeIcon,
} from "@heroicons/react/outline";

import { CgProfile } from "react-icons/cg";
import { BsCartFill } from "react-icons/bs";
import { FaStore } from "react-icons/fa";
import { MdSpaceDashboard, MdMedicalServices } from "react-icons/md";
import { FiBriefcase } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { LoginDropdown } from "./LoginDropdown";

const providerNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard/provider",
    icon: MdSpaceDashboard,
    current: false,
  },
  {
    name: "Store",
    href: "/dashboard/provider/store",
    icon: FaStore,
    current: false,
  },
  {
    name: "Products",
    href: "/dashboard/provider/products",
    icon: FiBriefcase,
    current: false,
  },
  {
    name: "Orders",
    href: "/dashboard/provider/orders",
    icon: BsCartFill,
    current: false,
  },
  {
    name: "Profile",
    href: "/dashboard/provider/profile",
    icon: CgProfile,
    current: false,
  },
];

const customerNavigation = [
  {
    name: "Stores",
    href: "/customer/stores",
    icon: FaStore,
    current: false,
  },
  {
    name: "Services",
    href: "/customer/services",
    icon: MdMedicalServices,
    current: false,
  },
  {
    name: "Orders",
    href: "/customer/orders",
    icon: BsCartFill,
    current: false,
  },
  {
    name: "Addresses",
    href: "/customer/address",
    icon: FaMapMarkerAlt,
    current: false,
  },
  {
    name: "Profile",
    href: "/customer/profile",
    icon: CgProfile,
    current: false,
  },
];

const volunteerNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard/volunteer",
    icon: MdSpaceDashboard,
    current: false,
  },
  {
    name: "Requests",
    href: "/dashboard/volunteer/requests",
    icon: FiBriefcase,
    current: false,
  },
  {
    name: "Active",
    href: "/dashboard/volunteer/active",
    icon: FiBriefcase,
    current: false,
  },
  {
    name: "Profile",
    href: "/dashboard/volunteer/profile",
    icon: CgProfile,
    current: false,
  },
];

const landingNavigation = [
  {
    name: "Home",
    href: "#home",
    icon: MdSpaceDashboard,
    current: false,
  },
  {
    name: "Features",
    href: "#features",
    icon: MdSpaceDashboard,
    current: false,
  },
  {
    name: "Flows",
    href: "#flows",
    icon: MdSpaceDashboard,
    current: false,
  },
  {
    name: "Reviews",
    href: "#flows",
    icon: MdSpaceDashboard,
    current: false,
  },
  {
    name: "FAQ",
    href: "#faq",
    icon: MdSpaceDashboard,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const { data: session } = useSession();
  const [navigation, setNavigation] = useState(landingNavigation);

  useEffect(() => {
    if (!session) setNavigation(landingNavigation);
    else if (session?.userDetails?.category === "provider") setNavigation(providerNavigation);
    else if (session?.userDetails?.category === "customer") setNavigation(customerNavigation);
    else setNavigation(volunteerNavigation);
  }, [session]);

  return (
    <Popover className='fixed top-0 left-0 z-40 w-full bg-white shadow'>
      <div className='flex justify-between items-center px-4 py-2 sm:px-6 md:justify-start md:space-x-10'>
        <div className='flex justify-start lg:w-0 lg:flex-1'>
          <Link href={"/"} passHref>
            <div className='w-40 h-[10vh]'>
              <img className='object-cover rounded-md h-full w-full' src='/logo.jpeg' alt='' />
            </div>
          </Link>
        </div>
        <div className='-mr-2 -my-2 md:hidden'>
          <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'>
            <span className='sr-only'>Open menu</span>
            <MenuIcon className='h-6 w-6' aria-hidden='true' />
          </Popover.Button>
        </div>
        <Popover.Group as='nav' className='hidden md:flex space-x-10'>
          {navigation.map((option, index) => (
            <Link key={index} href={option.href}>
              <a className='text-base font-medium text-gray-500 hover:text-gray-900'>
                {option.name}
              </a>
            </Link>
          ))}
        </Popover.Group>

        <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
          {session && (
            <div>
              {session?.userDetails?.image ? (
                <div className='hidden sm:ml-6 sm:flex sm:items-center'>
                  <img className='h-8 w-8 rounded-full' src={session?.userDetails?.image} alt='' />
                </div>
              ) : (
                <Loader height='6' width='6' color='gray' />
              )}
            </div>
          )}
          {session ? (
            <>
              {/* Profile dropdown */}
              <LoginDropdown />
            </>
          ) : (
            <Link href='/auth/signin'>
              <a className='ml-8 whitespace-nowrap inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-blue-700'>
                Sign in
              </a>
            </Link>
          )}
        </div>
      </div>

      <Transition
        as={Fragment}
        enter='duration-200 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Popover.Panel
          focus
          className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
        >
          <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
            <div className='pt-5 pb-6 px-5'>
              <div className='flex items-center justify-between'>
                <Link href={"/"} passHref>
                  <div className='w-40 h-[10vh]'>
                    <img
                      className='object-cover rounded-md h-full w-full'
                      src='/logo.jpeg'
                      alt=''
                    />
                  </div>
                </Link>
                <div className='-mr-2'>
                  <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'>
                    <span className='sr-only'>Close menu</span>
                    <XIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className='py-6 px-5'>
              <div className='grid grid-cols-2 gap-4'>
                {navigation.map((option, index) => (
                  <Link key={index} href={option.href}>
                    <a className='text-base font-medium text-gray-900 hover:text-gray-700'>
                      {option.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className='mt-6'>
                <Link href={"/auth/signin"}>
                  <a className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700'>
                    Sign In
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
