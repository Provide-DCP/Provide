import React, { Fragment, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Loader from '../../../../src/components/Layouts/Loader';
import { useRouter } from 'next/router';
const country = [{ id: 1, name: 'India' }];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const categoriesOptions = [
  { id: 1, title: 'food' },
  { id: 2, title: 'clothes' },
  { id: 3, title: 'medicines' },
  { id: 4, title: 'furniture' },
  { id: 5, title: 'books' },
];

const StoreAdd = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [addressName, setAddressName] = useState('');
  const [phone, setPhone] = useState('');
  const [building, setBuilding] = useState('');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [timings, setTimings] = useState({
    from: '',
    to: '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(country[0]);

  const handleCategory = (e) => {
    setCategory(document.querySelector('input[name="category"]:checked').value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const {
      data: { store },
    } = await axios.post('/api/store', {
      userId: session.userId,
      name,
      image,
      email,
      purpose,
      categories,
      approved: false,
      open: true,
      timings,
      addresses: [
        {
          name,
          phone,
          pincode,
          building,
          area,
          landmark,
          region: state,
          city,
          country: selectedCountry.name,
        },
      ],
    });
    if (store) router.push('/dashboard/provider');
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'uploads');
    try {
      setLoading(true);
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dj7nomqfd/image/upload',
        formData
      );
      setLoading(false);
      const { url } = uploadRes.data;
      setImage(url);
    } catch (error) {
      toast.error(error, { toastId: error });
    }
  };

  return (
    <main className='md:ml-[17%] mt-[2%] px-10'>
      <div className='space-y-6 max-w-7xl mx-auto my-10'>
        <h1 className='text-start my-10 text-3xl font-bold text-gray-600'>
          Create Store
        </h1>
        <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Store Infomation
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            <div className='mt-5 md:mt-0 md:col-span-2'>
              <form className='space-y-6' action='#' method='POST'>
                <div className='col-span-6 sm:col-span-4'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Store Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete='name'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-4'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Store Email
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='email'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label
                    htmlFor='purpose'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Purpose
                  </label>
                  <div className='mt-1'>
                    <textarea
                      id='purpose'
                      name='purpose'
                      rows={3}
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'
                      placeholder='About your store'
                    />
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    Few lines to describe your motive and promote your store.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor='timings'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Timings
                    <span className='text-gray-500'>(24 hours Format)</span>
                  </label>
                  <div className='mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                    <div className='sm:col-span-3'>
                      <label
                        htmlFor='from'
                        className='block text-sm font-medium text-gray-500'
                      >
                        From
                      </label>
                      <div className='mt-1'>
                        <input
                          type='text'
                          name='from'
                          id='from'
                          autoComplete='from'
                          required
                          value={timings.from}
                          onChange={(e) =>
                            setTimings({ ...timings, from: e.target.value })
                          }
                          placeholder='11:00'
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-3'>
                      <label
                        htmlFor='to'
                        className='block text-sm font-medium text-gray-500'
                      >
                        To
                      </label>
                      <div className='mt-1'>
                        <input
                          type='text'
                          name='to'
                          id='to'
                          autoComplete='to'
                          required
                          value={timings.to}
                          onChange={(e) =>
                            setTimings({ ...timings, to: e.target.value })
                          }
                          placeholder='13:00'
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='categories'
                    className='block text-sm font-medium text-gray-800 mb-2'
                  >
                    Categories
                  </label>
                  <fieldset className='space-y-5'>
                    <div className='relative flex justify-start'>
                      {categoriesOptions.map((category) => {
                        return (
                          <div key={category.id} className='flex mr-4'>
                            <div className='flex items-center h-5 w-6'>
                              <input
                                id={category.title}
                                name={category.title}
                                type='checkbox'
                                onChange={(e) => {
                                  const id = categories.indexOf(category.title);
                                  if (id == -1)
                                    setCategories([
                                      ...categories,
                                      category.title,
                                    ]);
                                  else {
                                    const cat = categories;
                                    cat.splice(id, 1);
                                    setCategories([...cat]);
                                  }
                                }}
                                className='h-4 w-4 text-indigo-600 border-gray-300 rounded'
                              />
                            </div>
                            <div className='ml-1 text-sm'>
                              <label
                                htmlFor={category.title}
                                className='font-medium text-gray-700'
                              >
                                {category.title}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>
                <div>
                  <label
                    htmlFor='photo'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Photo
                  </label>
                  <div className='mt-1'>
                    <div className='sm:mt-0 sm:col-span-2'>
                      {loading ? (
                        <div className='animate-pulse'>
                          <input className='appearance-none block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none bg-gray-200 sm:text-sm h-10'></input>
                        </div>
                      ) : (
                        <input
                          type='text'
                          value={image}
                          disabled={true}
                          onChange={(e) => setImage(e.target.value)}
                          className='appearance-none block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                      )}
                      {loading ? (
                        <div className='inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500 cursor-not-allowed'>
                          <Loader height='8' width='8' color='gray' />
                          Please Wait...
                        </div>
                      ) : (
                        <input
                          className='mt-2 appearance-none block w-3/4 p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                          label='Choose File'
                          type='file'
                          name='image'
                          id='profileImg'
                          onChange={uploadFileHandler}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Address
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Use a permanent address where you provide products.
              </p>
            </div>
            <div className='mt-5 md:mt-0 md:col-span-2'>
              <form action='#' method='POST'>
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='addressName'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Name
                    </label>
                    <input
                      type='text'
                      name='addressName'
                      id='addressName'
                      value={addressName}
                      onChange={(e) => setAddressName(e.target.value)}
                      autoComplete='family-name'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Phone
                    </label>
                    <input
                      type='text'
                      name='phone'
                      id='phone'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete='tel'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='relative -top-3 col-span-6 sm:col-span-3'>
                    <Listbox
                      value={selectedCountry}
                      onChange={setSelectedCountry}
                    >
                      {({ open }) => (
                        <>
                          <Listbox.Label className='flex items-center h-full block text-sm font-medium text-gray-700'>
                            Country
                          </Listbox.Label>
                          <div className='relative -top-4 left-0'>
                            <Listbox.Button className='bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                              <span className='block truncate'>
                                {selectedCountry.name}
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
                                {country.map((person) => (
                                  <Listbox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? 'text-white bg-indigo-600'
                                          : 'text-gray-900',
                                        'cursor-default select-none relative py-2 pl-3 pr-9'
                                      )
                                    }
                                    value={person}
                                  >
                                    {({ selectedCountry, active }) => (
                                      <>
                                        <span
                                          className={classNames(
                                            selectedCountry
                                              ? 'font-semibold'
                                              : 'font-normal',
                                            'block truncate'
                                          )}
                                        >
                                          {person.name}
                                        </span>

                                        {selectedCountry ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? 'text-white'
                                                : 'text-indigo-600',
                                              'absolute inset-y-0 right-0 flex items-center pr-4'
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
                    </Listbox>
                  </div>

                  <div className='col-span-6 mt-5'>
                    <label
                      htmlFor='street-address'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Building
                    </label>
                    <input
                      type='text'
                      name='street-address'
                      value={building}
                      onChange={(e) => setBuilding(e.target.value)}
                      id='street-address'
                      autoComplete='street-address'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                  <div className='col-span-6'>
                    <label
                      htmlFor='street-address'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Area
                    </label>
                    <input
                      type='text'
                      name='street-address'
                      id='street-address'
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      autoComplete='street-address'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                  <div className='col-span-6'>
                    <label
                      htmlFor='street-address'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Landmark
                    </label>
                    <input
                      type='text'
                      name='street-address'
                      id='street-address'
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      autoComplete='street-address'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium text-gray-700'
                    >
                      City
                    </label>
                    <input
                      type='text'
                      name='city'
                      id='city'
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      autoComplete='address-level2'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                    <label
                      htmlFor='region'
                      className='block text-sm font-medium text-gray-700'
                    >
                      State
                    </label>
                    <input
                      type='text'
                      name='region'
                      id='region'
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      autoComplete='address-level1'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                    <label
                      htmlFor='postal-code'
                      className='block text-sm font-medium text-gray-700'
                    >
                      ZIP / Postal code
                    </label>
                    <input
                      type='text'
                      name='postal-code'
                      id='postal-code'
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      autoComplete='postal-code'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            type='button'
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={onSubmitHandler}
            className={`${
              loading ? 'cursor-not-allowed' : 'hover:bg-indigo-700 '
            } ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600`}
          >
            Save
          </button>
        </div>
      </div>
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
  const {
    data: { store },
  } = await axios.get('http://localhost:3000/api/store', {
    params: {
      userId: session.userId,
    },
  });
  if (store) {
    return {
      redirect: {
        destination: '/dashboard/provider',
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

export default StoreAdd;
