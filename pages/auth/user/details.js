/* eslint-disable @next/next/link-passhref */
import React, { useState, useEffect, Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { reloadSession } from '../../../src/lib/helper';
import Loader from '../../../src/components/Layouts/Loader';
import { FaCheckCircle } from 'react-icons/fa';

const categories = [
  { id: 'customer', title: 'customer' },
  { id: 'volunteer', title: 'volunteer' },
  { id: 'provider', title: 'provider' },
];

const Details = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [category, setCategory] = useState('customer');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    name: '',
    street: '',
    location: {
      loading: false,
      coordinates: undefined,
    },
  });
  const [state, setState] = useState(0);

  const handlelocation = () => {
    setAddress({
      ...address,
      location: {
        loading: true,
      },
    });

    const onSuccess = (location) => {
      setAddress({
        ...address,
        location: {
          loading: false,
          coordinates: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        },
      });
    };

    const onError = (error) => {
      toast.error(error.message, { toastId: error.message });
      setAddress({
        ...address,
        location: {
          loading: true,
          error,
        },
      });
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: "Geolocation doesn't support your browser.",
      });
    }
  }, []);

  const handleCategory = (e) => {
    setCategory(document.querySelector('input[name="category"]:checked').value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/users', {
        userId: session.userId,
        firstName,
        lastName,
        image: session.user.image,
        category,
        phone,
        address: [
          {
            name: address.name,
            street: address.street,
            location: {
              latitude: address.location.coordinates.latitude,
              longitude: address.location.coordinates.longitude,
            },
          },
        ],
      });

      reloadSession();
      router.push(`/dashboard/${category}`);
    } catch (error) {
      toast.error(error.message, {
        toastId: error,
      });
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <React.Fragment>
      <Head>
        <title>Resume Builder | Details</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Fill in your details
            </h2>
          </div>
          <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-lg'>
            <div className='bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10'>
              <div>
                {state === 0 ? (
                  <React.Fragment>
                    <fieldset>
                      <div className='catdiv space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10'>
                        {categories.map((category) => (
                          <div key={category.id} className='flex items-center'>
                            <input
                              id={category.id}
                              name='category'
                              type='radio'
                              defaultChecked={category.id === 'customer'}
                              value={category.title}
                              onChange={(e) => handleCategory()}
                              className='h-4 w-4 text-indigo-600 border-gray-300'
                            />
                            <label
                              htmlFor={category.id}
                              className='ml-3 block text-sm font-medium text-gray-700 capitalize'
                            >
                              {category.title}
                            </label>
                          </div>
                        ))}
                      </div>
                      <div className='mt-4'>
                        <button
                          onClick={() => setState(1)}
                          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 '
                        >
                          Next
                        </button>
                      </div>
                    </fieldset>
                  </React.Fragment>
                ) : (
                  <div />
                )}

                {state === 1 ? (
                  <React.Fragment>
                    <button onClick={() => setState(0)}>Back</button>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='firstName'
                          className='block text-sm font-medium text-gray-700'
                        >
                          First Name
                        </label>
                        <input
                          type='text'
                          name='firstName'
                          id='firstName'
                          autoComplete='given-name'
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='lastName'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Last name
                        </label>
                        <input
                          type='text'
                          name='lastName'
                          id='lastName'
                          autoComplete='family-name'
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>

                    <div className='col-span-6 sm:col-span-4 mt-4'>
                      <label
                        htmlFor='phone'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Phone Number
                      </label>
                      <input
                        type='text'
                        name='phone'
                        id='phone'
                        autoComplete='tel'
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                    <div className='mt-4'>
                      <button
                        onClick={() => setState(2)}
                        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 '
                      >
                        Next
                      </button>
                    </div>
                  </React.Fragment>
                ) : (
                  <div />
                )}

                {state === 2 ? (
                  <div>
                    <button onClick={() => setState(1)}>Back</button>
                    <div className='col-span-6 sm:col-span-4 mt-4'>
                      <label
                        htmlFor='street-address-name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Address Name
                      </label>
                      <input
                        type='text'
                        name='street-address-name'
                        id='street-address-name'
                        autoComplete='street-address-name'
                        required
                        value={address.name}
                        onChange={(e) =>
                          setAddress({ ...address, name: e.target.value })
                        }
                        className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                    <div className='col-span-6 sm:col-span-4 mt-4'>
                      <label
                        htmlFor='street-address'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Address
                      </label>
                      <textarea
                        type='text'
                        name='street-address'
                        id='street-address'
                        autoComplete='street-address'
                        required
                        value={address.street}
                        onChange={(e) =>
                          setAddress({ ...address, street: e.target.value })
                        }
                        className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>

                    <div className='mt-4'>
                      <button
                        onClick={handlelocation}
                        disabled={address.location.coordinates}
                        className='w-full flex justify-center border border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-200'
                      >
                        {!address.location.loading ? (
                          address.location.coordinates ? (
                            <div className='py-2 px-4 flex justify-center items-center cursor-not-allowed w-full'>
                              <FaCheckCircle size={24} color={'green'} />
                              <p className='ml-3 text-base'>Location Granted</p>
                            </div>
                          ) : (
                            <div className='py-2 px-4 flex justify-center items-center hover:bg-gray-300 w-full'>
                              Grant Location Permission
                            </div>
                          )
                        ) : (
                          <div className='py-2 px-4 flex justify-center items-center cursor-not-allowed w-full'>
                            <Loader width={6} height={6} color='white' />
                            <p>Fetching...</p>
                          </div>
                        )}
                      </button>
                    </div>

                    <div className='mt-4'>
                      <button
                        disabled={
                          !address.location.coordinates &&
                          address.location.loading
                        }
                        type='submit'
                        onClick={submitHandler}
                        className={`${
                          !address.location.coordinates &&
                          address.location.loading
                            ? 'cursor-not-allowed'
                            : 'hover:bg-blue-700'
                        } w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 `}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
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
  if (session.userDetails) {
    return {
      redirect: {
        destination: `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Details;
