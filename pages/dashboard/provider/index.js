import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { Layout } from '../../../src/components/Dashboard/Layout';
import { Status } from '../../../src/components/Provider/Status';
import axios from 'axios';
import { EmptyState } from '../../../src/components/Provider/EmptyState';
import Link from 'next/link';
import { BiStore } from 'react-icons/bi';

const flows = [
  { id: '01', name: 'Create Store', href: '#', status: 'current' },
  { id: '02', name: 'Store Approval', href: '#', status: 'upcoming' },
  { id: '03', name: 'Add Product', href: '#', status: 'upcoming' },
];

const Index = ({ store, products }) => {
  const [steps, setSteps] = useState(flows);

  useEffect(() => {
    const popper = document.getElementById('popper');
    const popperHead = document.getElementById('popperHead');
    const addProduct = document.getElementById('addProduct');
    setTimeout(() => {
      if (popper && popperHead && addProduct) {
        popper.classList.add('hidden');
        popperHead.classList.add('hidden');
        addProduct.classList.remove('hidden');
      }
    }, 3000);
  }, []);

  if (store && steps[0].status !== 'complete') {
    let newstate = flows;
    newstate[0].status = 'complete';
    newstate[1].status = 'current';
    setSteps([...newstate]);
  }

  if (store.approved && steps[1].status !== 'complete') {
    let newstate = flows;
    newstate[1].status = 'complete';
    newstate[2].status = 'current';
    setSteps([...newstate]);
  }

  if (products.length > 0 && steps[2].status !== 'complete') {
    let newstate = flows;
    newstate[2].status = 'complete';
    setSteps([...newstate]);
  }

  if (
    steps[0].status === 'complete' &&
    steps[1].status === 'complete' &&
    steps[2].status === 'complete'
  ) {
    return (
      <>
        <main className='flex-1 md:ml-64 '>
          <div className='py-6'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
              <h1 className='text-2xl font-semibold text-gray-900'>
                Dashboard
              </h1>
            </div>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
              {/* Replace with your content */}
              <div className='py-4'>
                <div className='border-4 border-dashed border-gray-200 rounded-lg h-96' />
              </div>
              {/* /End replace */}
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <main className=' md:ml-64 px-10'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-start my-10 text-3xl font-bold uppercase text-gray-600'>
          Setup Account
        </h1>
        <Status steps={steps} />
        <div className='my-10'>
          {!store ? (
            <EmptyState
              heading='Add Store'
              link='/dashboard/store/add'
              Icon={BiStore}
            />
          ) : !store.approved ? (
            <div className='w-full mt-5 flex flex-col items-center'>
              <span className='relative inline-flex'>
                <div className='inline-flex items-center px-4 py-2 text-center font-bold leading-6 text-lg md:text-4xl rounded-md text-gray-500 bg-white transition ease-in-out duration-150 ring-1 ring-slate-900/10 dark:ring-slate-200/20'>
                  Please wait until our team approves your store.
                </div>
                <span className='flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75' />
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500' />
                </span>
              </span>
              <img className='mx-auto' src='/loading.gif' alt='loading' />
            </div>
          ) : (
            <div className='relative'>
              <h1
                data-aos='fade-up'
                id='popperHead'
                className='relative md:top-[100px] text-center text-lg md:text-3xl font-bold tracking-wide text-green-500'
              >
                Congratulations your store have been approved!
              </h1>
              <div id='popper' className='background min-h-[440px]'></div>
              <div id='addProduct' className='hidden absolute w-full top-20'>
                <EmptyState
                  heading='Add Product'
                  link='/dashboard/store/products/add'
                  Icon={BiStore}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
         .background {
            background: url(https://res.cloudinary.com/dj7nomqfd/image/upload/v1647543911/uploads/11272-party-popper_w2qnxr.gif) no-repeat right;
          }
          
        }`}</style>
    </main>
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
  if (session.userDetails.category !== 'provider') {
    const category = session.userDetails.category;
    return {
      redirect: {
        destination:
          category === 'customer'
            ? `/customer`
            : `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  const { data } = await axios.get('http://localhost:3000/api/store', {
    params: {
      userId: session.userId,
    },
  });
  const { store } = data;
  let products = [];
  if (store) {
    const { data } = await axios.get('http://localhost:3000/api/products', {
      params: {
        storeId: store._id,
      },
    });
    console.log(data);
    products = data.products;
  }

  return {
    props: {
      session,
      store,
      products,
    },
  };
};
export default Index;
