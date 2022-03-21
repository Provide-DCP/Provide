import React, { useState, Fragment, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Loader from "../../../../../src/components/Layouts/Loader";
import { Dropdown } from "../../../../../src/components/Shared/Dropdown";
import { Variation } from "../../../../../src/components/Shared/Variation";

const categories = [
  { id: 1, name: "Food" },
  { id: 2, name: "Clothes" },
  { id: 3, name: "Medicines" },
];

const initialState = {
  name: "",
  price: 0,
};

const EditProduct = ({ store, product }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState(product?.name);
  const [image, setImage] = useState(product?.image);
  const [price, setPrice] = useState(product?.price);
  const [description, setDescription] = useState(product?.description);
  const [selected, setSelected] = useState(
    categories.filter((x) => x.name === product?.category)[0]
  );

  const [variations, setVariations] = useState({
    sizes: product?.variations.sizes,
    colors: product?.variations.colors,
    toppings: product?.variations.toppings,
    doses: product?.variations.doses,
  });

  const [loading, setLoading] = useState(false);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uploads");
    try {
      setLoading(true);
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dj7nomqfd/image/upload",
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
      } = await axios.put(`http://localhost:3000/api/products/${product._id}`, {
        userId: session.userId,
        productId: product._id,
        name,
        image,
        price: parseInt(price),
        category: selected.name,
        available: true,
        description,
        variations,
      });
      if (message == "Product Updated!") {
        toast.success(message, { toastId: message });
        router.push(`/dashboard/provider/products/${product._id}`);
      } else {
        toast.error(message, { toastId: message });
      }
    } catch (e) {
      toast.error(e, { toastId: e });
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Resume Builder | Profile Edit</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='  mt-[2%] px-10'>
        <form
          onSubmit={submitHandler}
          className='max-w-5xl mx-auto space-y-8 divide-y divide-gray-200 px-10'
        >
          <div className='space-y-6 sm:space-y-5'>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>Product Information</h3>
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
                  Name
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
                  htmlFor='price'
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

              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5'>
                <Dropdown
                  heading='Categories'
                  options={categories}
                  selected={selected}
                  disabled={true}
                  setSelected={setSelected}
                />
              </div>

              {selected.name === "Food" && (
                <Variation
                  title='Toppings'
                  handleExtraOptions={(extra) =>
                    setVariations({ ...variations, toppings: [...variations.toppings, extra] })
                  }
                  deleteOption={(option) =>
                    setVariations({
                      ...variations,
                      toppings: variations.toppings.filter(
                        (x) => x.name !== option.name || x.price !== option.price
                      ),
                    })
                  }
                  extraOptions={variations.toppings}
                />
              )}

              {selected.name === "Clothes" && (
                <Variation
                  title='Sizes'
                  handleExtraOptions={(extra) =>
                    setVariations({ ...variations, sizes: [...variations.sizes, extra] })
                  }
                  deleteOption={(option) =>
                    setVariations({
                      ...variations,
                      sizes: variations.sizes.filter(
                        (x) => x.name !== option.name || x.price !== option.price
                      ),
                    })
                  }
                  extraOptions={variations.sizes}
                />
              )}

              {selected.name === "Clothes" && (
                <Variation
                  title='Colors'
                  handleExtraOptions={(extra) =>
                    setVariations({ ...variations, colors: [...variations.colors, extra] })
                  }
                  deleteOption={(option) =>
                    setVariations({
                      ...variations,
                      colors: variations.colors.filter(
                        (x) => x.name !== option.name || x.price !== option.price
                      ),
                    })
                  }
                  extraOptions={variations.colors}
                />
              )}

              {selected.name === "Medicines" && (
                <Variation
                  title='Doses'
                  handleExtraOptions={(extra) =>
                    setVariations({ ...variations, doses: [...variations.doses, extra] })
                  }
                  deleteOption={(option) =>
                    setVariations({
                      ...variations,
                      doses: variations.doses.filter(
                        (x) => x.name !== option.name || x.price !== option.price
                      ),
                    })
                  }
                  extraOptions={variations.doses}
                />
              )}

              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                >
                  Description
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  {status === "loading" ? (
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
                <h3 className='text-lg leading-6 font-medium text-gray-900'>Product Image</h3>
                <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                  This information will be displayed publicly so be careful what you share.
                </p>
              </div>

              <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
                <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5'>
                  <label htmlFor='photo' className='block text-sm font-medium text-gray-700'>
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
                  loading ? "cursor-not-allowed" : "hover:bg-blue-700"
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

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const userId = session?.userId;

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  if (!session.userDetails) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }

  const {
    data: { store },
  } = await axios.get(process.env.HOST_URL + "/api/store", {
    params: {
      userId: session.userId,
    },
  });

  const {
    data: { product },
  } = await axios.get(`http://localhost:3000/api/products/${context.query.id}`);

  if (session.userDetails.category !== "provider" || !store || !product) {
    const category = session.userDetails.category;
    return {
      redirect: {
        destination:
          category === "customer" ? `/customer` : `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      store,
      product,
    },
  };
};

export default EditProduct;
