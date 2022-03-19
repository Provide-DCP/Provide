import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import Loader from '../../../../src/components/Layouts/Loader';
import { reloadSession } from '../../../../src/lib/helper';

const AddProduct = ({ store }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [available, setAvailable] = useState(true);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { message },
      } = await axios.post('http://localhost:3000/api/products', {
        userId: session.userId,
        storeId: store._id,
        name,
        image: 'adfa',
        price: parseInt(price),
        category,
        available,
        description,
      });
      if (message == 'Success! Product Created') {
        toast.success(message, { toastId: message });
        router.push('/dashboard/provider/store/products');
      } else {
        toast.error(message, { toastId: message });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Resume Builder | Profile Edit</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='md:ml-[17%] mt-[2%] px-10'>
        <form
          onSubmit={submitHandler}
          className='max-w-5xl mx-auto space-y-8 divide-y divide-gray-200 px-10'
        >
          <div className='space-y-6 sm:space-y-5'>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Product Information
              </h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div className='space-y-6 sm:space-y-5'>
              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                >
                  name
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete='given-name'
                    className='max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>

              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                >
                  Price
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  <input
                    type='number'
                    name='price'
                    id='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className='max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>

              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                >
                  Category
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  <input
                    type='text'
                    name='category'
                    id='category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>

              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                >
                  Description
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  {status === 'loading' ? (
                    <div className='animate-pulse'>
                      <input className='max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 cursor-not-allowed bg-gray-200 rounded-md h-10'></input>
                    </div>
                  ) : (
                    <textarea
                      id='description'
                      name='description'
                      type='text'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className='max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='pt-8 space-y-8 divide-y divide-gray-200 sm:space-y-5'>
            <div>
              <div>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  Product Image
                </h3>
                <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
                <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5'>
                  <label
                    htmlFor='photo'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Photo
                  </label>
                  <div className='mt-1 sm:mt-0 sm:col-span-2 '>
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
            </div>
          </div>

          <div className='pt-5 pb-20'>
            <div className='flex justify-end'>
              <Link href='/dashboard/student/profile'>
                <button
                  type='button'
                  className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 '
                >
                  Cancel
                </button>
              </Link>
              <button
                onClick={submitHandler}
                type='submit'
                disabled={loading}
                className={`${
                  loading ? 'cursor-not-allowed' : 'hover:bg-blue-700'
                } ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600`}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  const userId = session?.userId;

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
    return {
      redirect: {
        destination: `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  const {
    data: { store },
  } = await axios.get('http://localhost:3000/api/store', {
    params: {
      userId: userId,
    },
  });

  return {
    props: {
      store,
    },
  };
};

export default AddProduct;
