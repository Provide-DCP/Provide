import React, { useState, useEffect, Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { reloadSession } from '../../../src/lib/helper';
import Loader from '../../../src/components/Layouts/Loader';

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
      coordinates: { latitude: '', longitude: '' },
    },
  });
  const [state, setState] = useState(0);
  // const [location, setLocation] = useState({
  //   loading: false,
  //   coordinates: { latitude: '', longitude: '' },
  // });

  const handlelocation = () => {
    setAddress({
      ...state,
      location: {
        ...state,
        loading: true,
      },
    });

    const onSuccess = (location) => {
      setAddress({
        ...state,
        location: {
          ...state,
          loading: false,
          coordinates: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        },
      });
    };

    const onError = (error) => {
      setAddress({
        ...state,
        location: {
          ...state,
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

  useEffect(() => {
    if (session.userDetails !== undefined) {
      router.push(`/dashboard/${session.userDetails.category}`);
    }
  }, [session.userDetails]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:3000/api/users', {
        userId: session.userId,
        image: session.user.image,
        firstName,
        lastName,
        category,
        phone,
      });

      reloadSession();
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
              Sign in to your account
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Or{' '}
              <Link href='/login'>
                <span className='font-medium text-blue-600 hover:text-blue-500 cursor-pointer'>
                  Login
                </span>
              </Link>
            </p>
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
                              defaultChecked={category.id === 'student'}
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
                        onChange={(e) => setAddress({ street: e.target.value })}
                        className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>

                    <div className='mt-4'>
                      <button
                        onClick={handlelocation}
                        disabled={location.loading}
                        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 '
                      >
                        {location.loading ? (
                          <div className='flex'>
                            <Loader width={6} height={6} color='white' />
                          </div>
                        ) : (
                          <div>Grant Location Permission</div>
                        )}
                      </button>
                    </div>

                    <div className='mt-4'>
                      <button
                        type='submit'
                        onClick={submitHandler}
                        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 '
                      >
                        Submit
                      </button>
                    </div>
                  </React.Fragment>
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

// const [selected, setSelected] = useState(people[0]);
// const people = [
//   { id: 1, name: 'CVR College Of Engineering' },
//   { id: 2, name: 'G.V.& A.D.S.L. College of Education (Id: C-32678)' },
//   { id: 3, name: 'G.V.R & S College of Education (Id: C-39228)' },
//   { id: 4, name: 'G.V.R.S Institute for Professional Studies (Id: C-32718)' },
//   { id: 5, name: 'Hazarath Ameeruddin College of Education (Id: C-39272)' },
// ];

/* <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                      <>
                        <Listbox.Label className='my-2 block text-sm font-medium text-gray-700'>
                          College
                        </Listbox.Label>
                        <div className='mb-5 relative'>
                          <Listbox.Button className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                            <span className='block truncate'>
                              {selected.name}
                            </span>
                            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                              <SelectorIcon
                                className='h-5 w-5 text-gray-400'
                                aria-hidden='true'
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                          >
                            <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                              {people.map((person) => (
                                <Listbox.Option
                                  key={person.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? 'text-white bg-indigo-600'
                                        : 'text-gray-900',
                                      'cursor-default select-none relative py-2 pl-8 pr-4'
                                    )
                                  }
                                  value={person}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={classNames(
                                          selected
                                            ? 'font-semibold'
                                            : 'font-normal',
                                          'block truncate'
                                        )}
                                      >
                                        {person.name}
                                      </span>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? 'text-white'
                                              : 'text-indigo-600',
                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                          )}
                                        >
                                          <CheckIcon
                                            className='h-5 w-5'
                                            aria-hidden='true'
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox> */
