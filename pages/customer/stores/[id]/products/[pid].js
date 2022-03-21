/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";
import { ProductOption } from "../../../../../src/components/Provider/ProductOption";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product({ store, product, reviews }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedColor, setSelectedColor] = useState(
    product.variations.colors.length > 0 ? product.variations.colors[0] : ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product.variations.sizes.length > 0 ? product.variations.sizes[0] : ""
  );
  const [selectedDose, setSelectedDose] = useState(
    product.variations.doses.length > 0 ? product.variations.doses[0] : ""
  );
  const [selectedToppings, setSelectedToppings] = useState([]);

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

  const handleBuy = async () => {
    try {
      let total = parseInt(product.price);
      total = total + (selectedColor === "" ? 0 : parseInt(selectedColor.price));
      total = total + (selectedSize === "" ? 0 : parseInt(selectedSize.price));
      total = total + (selectedDose === "" ? 0 : parseInt(selectedDose.price));
      selectedToppings.forEach((topping) => (total += parseInt(topping.price)));
      const {
        data: { message, order },
      } = await axios.post(`http://localhost:3000/api/orders`, {
        user: session.userId,
        store: store._id,
        product: product._id,
        variations: {
          sizes: selectedSize === "" ? [] : [selectedSize],
          colors: selectedColor === "" ? [] : [selectedColor],
          toppings: [...selectedToppings],
          doses: selectedDose === "" ? [] : [selectedDose],
        },
        total,
        status: 0,
        method: 1,
      });
      if (message === "Success! Order Created") {
        const {
          data: { otp },
        } = await axios.post("/api/otp", {
          order: order._id,
          value: Math.ceil(Math.random() * 1000000),
        });
        if (otp) {
          toast.success(message, { toastId: message });
          router.push("/customer/orders");
        }
      } else {
        toast.error(message, { toastId: message });
      }
    } catch (e) {
      toast.error(e, { toastId: e });
    }
  };

  return (
    <div className="md:ml-[14%]">
      <Disclosure as="div" className="relative bg-sky-700 pb-32 overflow-hidden">
        {({ open }) => (
          <>
            <div
              aria-hidden="true"
              className={classNames(
                open ? "bottom-0" : "inset-y-0",
                "absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0"
              )}
            >
              <div className="absolute inset-0 flex">
                <div className="h-full w-1/2" style={{ backgroundColor: "#0a527b" }} />
                <div className="h-full w-1/2" style={{ backgroundColor: "#065d8c" }} />
              </div>
              <div className="relative flex justify-center">
                <svg
                  className="flex-shrink-0"
                  width={1750}
                  height={308}
                  viewBox="0 0 1750 308"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#0369a1" />
                  <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#065d8c" />
                  <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
                  <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#0a4f76" />
                </svg>
              </div>
            </div>
            <header className="relative py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white">Product Details</h1>
              </div>
            </header>
          </>
        )}
      </Disclosure>

      <main className="relative -mt-32">
        <div className="w-[86%] ml-[7%] flex text-base text-left w-full md:inline-block md:my-8 md:align-middle">
          <div className="rounded-lg shadow w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
              <div className="grid h-full content-center aspect-w-2 aspect-h-1 md:aspect-h-2 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                <img src={product.image} alt={""} className="object-center object-cover" />
              </div>
              <div className="grid content-between h-full sm:col-span-8 lg:col-span-7">
                <div>
                  <h3 className="text-xl font-bold tracking-wide">{product.name}</h3>
                  <p className="my-1 text-md font-bold text-gray-600">Rs. {product.price}</p>

                  <section aria-labelledby="information-heading" className="mt-2">
                    {/* Reviews */}
                    <div className="mt-6">
                      <h4 className="sr-only">Reviews</h4>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                product.rating > rating ? "text-gray-900" : "text-gray-200",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>

                        <a
                          href="#"
                          className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {reviews?.length} reviews
                        </a>
                      </div>
                    </div>
                  </section>

                  <p className="text-md text-gray-500 my-2">
                    {product.description.charAt(0).toUpperCase() + product.description.slice(1)}
                  </p>

                  <section aria-labelledby="options-heading" className="mt-4">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>

                    <div>
                      {product.variations.sizes.length > 0 && (
                        <ProductOption
                          name="Size"
                          options={product.variations.sizes}
                          selected={selectedSize}
                          setSelected={setSelectedSize}
                        />
                      )}
                      {product.variations.colors.length > 0 && (
                        <ProductOption
                          name="Color"
                          options={product.variations.colors}
                          selected={selectedColor}
                          setSelected={setSelectedColor}
                        />
                      )}
                      {product.variations.toppings.length > 0 && (
                        <ProductOption
                          name="Topping"
                          options={product.variations.toppings}
                          selected={selectedToppings}
                          setSelected={setSelectedToppings}
                        />
                      )}
                      {product.variations.doses.length > 0 && (
                        <ProductOption
                          name="Dose"
                          options={product.variations.doses}
                          selected={selectedDose}
                          setSelected={setSelectedDose}
                        />
                      )}
                    </div>
                  </section>
                </div>
                {session.userDetails.category === "provider" ? (
                  <>
                    {" "}
                    <a
                      href={`/dashboard/provider/products/${product._id}/edit`}
                      className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Edit Product
                    </a>
                    <div
                      onClick={handleDelete}
                      className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      Delete Product
                    </div>
                  </>
                ) : (
                  <div
                    onClick={handleBuy}
                    className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    Buy now
                  </div>
                )}
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
  } = await axios.get(`http://localhost:3000/api/store/${context.query.id}`);

  const {
    data: { product },
  } = await axios.get(`http://localhost:3000/api/products/${context.query.pid}`);

  let reviews = [];
  if (product) {
    const { data } = await axios.get("http://localhost:3000/api/reviews", {
      params: {
        productId: product._id,
      },
    });
    reviews = data.reviews;
  }

  if (session.userDetails.category !== "customer" || !store || !product) {
    const category = session.userDetails.category;
    return {
      redirect: {
        destination:
          category === "customer" ? `/customer` : `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  console.log(store, product);

  return {
    props: {
      session,
      store,
      product,
      reviews,
    },
  };
};
