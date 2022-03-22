/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";
import { ProductOption } from "../../../../../src/components/Provider/ProductOption";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { AiTwotoneStar } from "react-icons/ai";
import { Header } from "../../../../../src/components/Layouts/Header";

export default function Product({ store, product, reviews }) {
  const router = useRouter();
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const totalRating = 0;
    reviews.forEach((x) => {
      totalRating += parseInt(x.rating);
    });
    setAverageRating(totalRating / reviews.length);
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleDelete = async () => {
    try {
      const {
        data: { message },
      } = await axios.delete(`http://localhost:3000/api/products/${product._id}`);
      if (message === "Product Deleted!") {
        toast.success(message, { toastId: message });
        router.push("/dashboard/provider/products");
      } else {
        toast.error(message, { toastId: message });
      }
    } catch (e) {
      toast.error(e, { toastId: e });
    }
  };

  return (
    <div className=' '>
      <Header heading={"Product Details"} />
      <main className='relative -mt-32'>
        <div className='w-[86%] ml-[7%] flex text-base text-left w-full md:inline-block md:my-8 md:align-middle'>
          <div className='rounded-lg shadow w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
            <div className='w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8'>
              <div className='grid h-full content-center aspect-w-2 aspect-h-1 md:aspect-h-2 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5'>
                <img src={product.image} alt={""} className='object-center object-cover' />
              </div>
              <div className='grid content-between h-full sm:col-span-8 lg:col-span-7'>
                <div>
                  <h3 className='text-xl font-bold tracking-wide'>{product.name}</h3>
                  <p className='my-1 text-md font-bold text-gray-600'>Rs. {product.price}</p>

                  <section aria-labelledby='information-heading' className='mt-2'>
                    {/* Reviews */}
                    <div className='mt-6'>
                      <h4 className='sr-only'>Reviews</h4>
                      <div className='flex items-center'>
                        <div className='flex items-center'>
                          {[1, 2, 3, 4, 5].map((x) => {
                            return (
                              <div
                                key={x}
                                className={`${
                                  x <= averageRating ? "text-yellow-400" : "text-gray-200"
                                }`}
                                onClick={() => setRating(x)}
                              >
                                <AiTwotoneStar size={32} />
                              </div>
                            );
                          })}
                        </div>

                        <p className='sr-only'>{averageRating} out of 5 stars</p>
                        <a
                          href='#'
                          className='ml-3 text-sm font-medium text-blue-600 hover:text-blue-500'
                        >
                          {reviews.length} reviews
                        </a>
                      </div>
                    </div>
                  </section>

                  <p className='text-md text-gray-500 my-2'>
                    {product.description.charAt(0).toUpperCase() + product.description.slice(1)}
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
                          selected={""}
                          setSelected={() => {}}
                        />
                      )}
                      {product.variations.colors.length > 0 && (
                        <ProductOption
                          name='Color'
                          options={product.variations.colors}
                          selected={""}
                          setSelected={() => {}}
                        />
                      )}
                      {product.variations.toppings.length > 0 && (
                        <ProductOption
                          name='Topping'
                          options={product.variations.toppings}
                          selected={""}
                          setSelected={() => {}}
                        />
                      )}
                      {product.variations.doses.length > 0 && (
                        <ProductOption
                          name='Dose'
                          options={product.variations.doses}
                          selected={""}
                          setSelected={() => {}}
                        />
                      )}
                    </div>
                  </section>
                </div>

                <div className='flex flex-col justify-center xl:flex-row xl:justify-start'>
                  <a
                    href={`/dashboard/provider/products/${product._id}/edit`}
                    className='mt-6 w-full xl:w-[40%] xl:mr-4 bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700'
                  >
                    Edit Product
                  </a>
                  <div
                    onClick={handleDelete}
                    className='mt-6 w-full xl:w-[40%] bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-700 cursor-pointer'
                  >
                    Delete Product
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

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

  let reviews = [];
  if (product) {
    const { data } = await axios.get(process.env.HOST_URL + "/api/reviews", {
      params: {
        productId: product._id,
      },
    });
    reviews = data.reviews;
  }

  if (session.userDetails.category !== "provider" || !store || !product) {
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

  console.log(reviews);

  return {
    props: {
      session,
      store,
      product,
      reviews,
    },
  };
};
