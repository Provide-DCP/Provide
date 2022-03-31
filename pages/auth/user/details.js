/* eslint-disable @next/next/link-passhref */
import React, { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import { reloadSession } from "../../../src/lib/helper";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const categories = [
  { id: "customer", title: "customer" },
  { id: "volunteer", title: "volunteer" },
  { id: "provider", title: "provider" },
];

const Details = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [category, setCategory] = useState("customer");
  const [phone, setPhone] = useState("");
  // const [location, setLocation] = useState({
  //   loading: false,
  //   coordinates: undefined,
  // });
  const [state, setState] = useState(0);

  // const handlelocation = () => {
  //   setLocation({
  //     loading: true,
  //   });

  //   const onSuccess = (location) => {
  //     setLocation({
  //       loading: false,
  //       coordinates: {
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //       },
  //     });
  //   };

  //   const onError = (error) => {
  //     toast.error(error.message, { toastId: error.message });
  //     setLocation({
  //       loading: true,
  //       error,
  //     });
  //   };

  //   navigator.geolocation.getCurrentPosition(onSuccess, onError);
  // };

  // useEffect(() => {
  //   if (!('geolocation' in navigator)) {
  //     onError({
  //       code: 0,
  //       message: "Geolocation doesn't support your browser.",
  //     });
  //   }
  // }, []);

  const handleCategory = (e) => {
    setCategory(document.querySelector('input[name="category"]:checked').value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/users", {
        userId: session.userId,
        firstName,
        lastName,
        image:
          session.user.image ||
          "http://res.cloudinary.com/dj7nomqfd/image/upload/v1647117869/uploads/bphhxvmlcyyu2pntbikm.png",
        category,
        phone,
      });

      reloadSession();

      router.push(category === "customer" ? "/customer/stores" : `/dashboard/${category}`);
    } catch (error) {
      toast.error(error.message, {
        toastId: error,
      });
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
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
                    <div className='flex flex-col'>
                      <h1 className='text-lg text-center uppercase font-bold text-sky-700'>
                        Select account type
                      </h1>
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={(e) => {
                            setCategory(category.title);
                            setState(1);
                          }}
                          className='px-5 h-28 flex justify-between items-center w-full rounded-lg shadow-md my-5 hover:shadow-xl'
                        >
                          <div className='h-24'>
                            {category.title === "customer" ? (
                              <img className='h-full' src='/customers.svg' alt='' />
                            ) : category.title === "volunteer" ? (
                              <img className='h-full' src='/volunteer.svg' alt='' />
                            ) : (
                              <img className='h-full' src='/provider.svg' alt='' />
                            )}
                          </div>
                          <h2 className='text-gray-600 font-bold text-2xl'>
                            <span className='capitalize relative inline-block mr-4'>
                              {category.title}
                            </span>
                          </h2>
                          <div className='w-16'>
                            <img className='w-7 mx-auto' src='/right-arrow.png' alt='right-arrow' />
                          </div>
                        </button>
                      ))}
                    </div>
                  </React.Fragment>
                ) : (
                  <div />
                )}

                {state === 1 ? (
                  <React.Fragment>
                    <button
                      className='relative right-5 mb-3 text-gray-800 hover:text-gray-500'
                      onClick={() => setState(0)}
                    >
                      <MdOutlineArrowBackIosNew />
                    </button>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-6 sm:col-span-6'>
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

                      <div className='col-span-6 sm:col-span-6'>
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

                    <div className='col-span-6 sm:col-span-4 mt-7'>
                      <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
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
                    {/* <div className='mt-4'>
                      <button
                        onClick={handlelocation}
                        disabled={location.coordinates}
                        className='w-full flex justify-center border border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-200'
                      >
                        {!location.loading ? (
                          location.coordinates ? (
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
                    </div> */}

                    <div className='mt-4'>
                      <button
                        disabled={!location.coordinates && location.loading}
                        type='submit'
                        onClick={submitHandler}
                        className={`${
                          !location.coordinates && location.loading
                            ? "cursor-not-allowed"
                            : "hover:bg-blue-700"
                        } w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 `}
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
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  if (session.userDetails) {
    const category = session.userDetails.category;
    return {
      redirect: {
        destination:
          category === "customer"
            ? `/customer/stores`
            : `/dashboard/${session.userDetails.category}`,
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
