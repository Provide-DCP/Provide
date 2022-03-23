/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { Purpose } from "../../../../src/components/Provider/Purpose";
import { AiFillStar } from "react-icons/ai";
import { FaDirections } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProductList } from "../../../../src/components/Shared/ProductList";
import { ReviewCard } from "../../../../src/components/Shared/ReviewCard";
import { NoOrderProductState } from "../../../../src/components/Shared/NoOrderProductState";
import { Header } from "../../../../src/components/Layouts/Header";

const tabs = [
  { name: "Profile", href: "#", current: true },
  { name: "Calendar", href: "#", current: false },
  { name: "Recognition", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const StoreSlug = ({ store, products, reviews }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showProducts, setShowProducts] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const totalRating = 0;
    reviews.forEach((x) => {
      totalRating += parseInt(x.rating);
    });
    setAverageRating(totalRating / reviews.length);
  }, []);
  return (
    <>
      <Header heading={"Store Details"} />
      <main className='relative -mt-40'>
        <div className='w-[86%] mx-auto flex text-base text-left w-full md:my-8 md:align-middle'>
          <div className='rounded-lg shadow w-full relative bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
            <div className='rounded-md max-w-[100%] mx-auto h-[450px] inset-0'>
              <img
                className='w-full h-full object-cover rounded-md'
                src={store?.image}
                alt='store-image'
              />
            </div>
            <div className='mt-5 px-2 flex flex-col md:flex-row md:items-center justify-between'>
              <h1 className='text-4xl font-semibold text-gray-800'>{store?.name}</h1>
              <div className='flex items-center'>
                <div className='my-2 md:my-0 w-16 flex items-center justify-between px-3 rounded-md bg-green-600 mr-2 text-white py-1'>
                  <span className='font-bold mr-1'>{averageRating}</span>
                  <AiFillStar />
                </div>
                <p className='text-sm font-semibold text-gray-600'>
                  {" "}
                  {store?.reviews?.length} <span>Reviews</span>
                </p>
              </div>
            </div>
            <div className='mt-2 px-3 flex flex-col'>
              <div className='text-xl font-light mb-4 mt-2'>
                {store?.categories.map((category, index) => {
                  return (
                    <p
                      className='inline-block border rounded-md bg-gray-100 py-1 px-3 mr-3 text-base'
                      key={index}
                    >
                      {category}
                    </p>
                  );
                })}
              </div>
              <div className='my-1 text-lg text-gray-400'>
                {store?.addresses[0]?.building}, <br />
                {store?.addresses[0]?.city}
                <br />
                {store?.addresses[0]?.region}, {store?.addresses[0]?.country}.
              </div>
            </div>
            <div className='flex items-center mt-3'>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${store?.addresses[0]?.location?.latitude},${store?.addresses[0]?.location?.longitude}`}
                className='inline-flex items-center border-2 mx-2 py-1 px-2 rounded-md text-red-400 hover:bg-gray-100
        '
                target={`_blank`}
              >
                <FaDirections />
                <span className='ml-2 text-gray-800'>Direction</span>
              </a>
              {session?.userDetails.category === "provider" && (
                <Link href={`/dashboard/provider/store/edit`}>
                  <a
                    className='inline-flex items-center border-2 mx-2 py-1 px-2 rounded-md text-blue-400 hover:bg-gray-100
        '
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
                      <path
                        fillRule='evenodd'
                        d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='ml-2 text-gray-800'>Edit</span>
                  </a>
                </Link>
              )}
            </div>
            <div className='mt-6 sm:mt-2 2xl:mt-5'>
              <div className='border-b border-gray-200'>
                <div className='px-4 sm:px-6 lg:px-8'>
                  <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
                    <button
                      onClick={() => setShowProducts(true)}
                      className={classNames(
                        showProducts
                          ? "border-pink-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md"
                      )}
                      aria-current={showProducts ? "page" : undefined}
                    >
                      Products
                    </button>
                    <button
                      onClick={() => setShowProducts(false)}
                      className={classNames(
                        !showProducts
                          ? "border-pink-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md"
                      )}
                      aria-current={!showProducts ? "page" : undefined}
                    >
                      Reviews
                    </button>
                  </nav>
                </div>
              </div>
            </div>
            {showProducts === true ? (
              <div className='my-10'>
                {products?.length === 0 ? (
                  // <p className='px-2 text-lg tracking-wide font-semibold text-gray-700'>
                  //   No Products Yet
                  // </p>
                  <div className='my-40'>
                    <NoOrderProductState
                      heading={`Looks like store owner haven't added any product.`}
                      href={"/customer/stores"}
                      buttonText={"Go To Stores"}
                      image={"/empty_cart.svg"}
                    />
                  </div>
                ) : (
                  <ProductList products={products} />
                )}
              </div>
            ) : (
              <div className='my-10'>
                {reviews?.length === 0 ? (
                  <div className='my-40'>
                    <NoOrderProductState
                      heading={`No reviews yet.`}
                      href={"/customer/stores"}
                      buttonText={"Go To Stores"}
                      image={"/empty_review.svg"}
                    />
                  </div>
                ) : (
                  <div>
                    {reviews.map((review, index) => (
                      <ReviewCard key={index} review={review} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const {
    data: { store },
  } = await axios.get(`http://localhost:3000/api/store/${context.query.id}`);

  const {
    data: { reviews },
  } = await axios.get(process.env.HOST_URL + "/api/reviews", {
    params: {
      storeId: context.query.id,
    },
  });

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

  if (session.userDetails.category !== "customer" || !store) {
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

  let products = [];
  const { data } = await axios.get(process.env.HOST_URL + "/api/products", {
    params: {
      storeId: context.query.id,
    },
  });
  products = data.products;

  // console.log(reviews);

  return {
    props: {
      store,
      products,
      session,
      reviews,
    },
  };
};

export default StoreSlug;
