/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import { getSession, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ProductOption } from '../../../../../src/components/Provider/ProductOption';
import { useRouter } from 'next/router';

export default function Product({ store, product }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedColor, setSelectedColor] = useState(
    product.variations.colors.length > 0 ? product.variations.colors[0] : ''
  );
  const [selectedSize, setSelectedSize] = useState(
    product.variations.sizes.length > 0 ? product.variations.sizes[0] : ''
  );
  const [selectedDose, setSelectedDose] = useState(
    product.variations.doses.length > 0 ? product.variations.doses[0] : ''
  );
  const [selectedTopping, setSelectedTopping] = useState('');

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const handleDelete = async () => {
    try {
      const {
        data: { message },
      } = await axios.delete(
        `http://localhost:3000/api/products/${product._id}`
      );
      console.log(message);
      if (message === 'Product Deleted!') {
        toast.success(message, { toastId: message });
        router.push('/dashboard/provider/products');
      } else {
        toast.error(message, { toastId: message });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBuy = async () => {};

  return (
    <div className='ml-[14%] w-[86%] flex text-base text-left w-full md:inline-block md:my-8 md:align-middle'>
      <div className='w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
        <div className='w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8'>
          <div className='aspect-w-2 aspect-h-2 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5'>
            <img
              src={product.image}
              alt={''}
              className='object-center object-cover'
            />
          </div>
          <div className='grid content-between h-full sm:col-span-8 lg:col-span-7'>
            <div>
              <h3 className='text-xl font-bold tracking-wide'>
                Distant Mountains Artwork Tee
              </h3>
              <p className='my-1 text-md font-bold text-gray-600'>Rs.30</p>

              <section aria-labelledby='information-heading' className='mt-2'>
                {/* Reviews */}
                <div className='mt-6'>
                  <h4 className='sr-only'>Reviews</h4>
                  <div className='flex items-center'>
                    <div className='flex items-center'>
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating > rating
                              ? 'text-gray-900'
                              : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden='true'
                        />
                      ))}
                    </div>

                    <p className='sr-only'>{product.rating} out of 5 stars</p>
                    <a
                      href='#'
                      className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      {product && product.reviews.length} reviews
                    </a>
                  </div>
                </div>
              </section>

              <p className='text-md text-gray-500 my-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, consectetur consequatur saepe fugiat voluptatum harum.
                Cumque ipsa deserunt, tempora, illum omnis quis dignissimos
                iusto illo debitis voluptatibus ab dolor at.
              </p>

              <section aria-labelledby='options-heading' className='mt-4'>
                <h3 id='options-heading' className='sr-only'>
                  Product options
                </h3>

                <div>
                  {product.variations.sizes.length > 0 && (
                    <ProductOption
                      name='Size'
                      options={product.variations.sizes}
                      selected={selectedSize}
                      setSelected={setSelectedSize}
                    />
                  )}
                  {product.variations.colors.length > 0 && (
                    <ProductOption
                      name='Color'
                      options={product.variations.colors}
                      selected={selectedColor}
                      setSelected={setSelectedColor}
                    />
                  )}
                  {product.variations.toppings.length > 0 && (
                    <ProductOption
                      name='Topping'
                      options={product.variations.toppings}
                      selected={selectedTopping}
                      setSelected={setSelectedTopping}
                    />
                  )}
                  {product.variations.doses.length > 0 && (
                    <ProductOption
                      name='Dose'
                      options={product.doses.sizes}
                      selected={selectedDose}
                      setSelected={setSelectedDose}
                    />
                  )}
                </div>
              </section>
            </div>
            {session.userDetails.category === 'provider' ? (
              <>
                {' '}
                <a
                  href={`/dashboard/provider/products/${product._id}/edit`}
                  className='mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Edit Product
                </a>
                <div
                  onClick={handleDelete}
                  className='mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer'
                >
                  Delete Product
                </div>
              </>
            ) : (
              <div
                onClick={handleBuy}
                className='mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer'
              >
                Buy now
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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

  const {
    data: { store },
  } = await axios.get(`http://localhost:3000/api/store/${context.query.id}`);

  const {
    data: { product },
  } = await axios.get(
    `http://localhost:3000/api/products/${context.query.pid}`
  );

  if (session.userDetails.category !== 'customer' || !store || !product) {
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

  return {
    props: {
      session,
      store,
      product,
    },
  };
};
