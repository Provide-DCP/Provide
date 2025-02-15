import React from "react";
import { ProductList } from "../../../../src/components/Shared/ProductList";
import { getSession } from "next-auth/react";
import axios from "axios";
import { NoOrderProductState } from "../../../../src/components/Shared/NoOrderProductState";
import { Header } from "../../../../src/components/Layouts/Header";

const ProductIndex = ({ store, products }) => {
  return (
    <>
      <Header heading={"Your Products"} />
      <main className='relative -mt-40'>
        <div className='w-[86%] mx-auto flex text-base text-left w-full md:my-8 md:align-middle'>
          <div className='rounded-lg shadow w-full relative bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
            {products?.length > 0 ? (
              <section className='flex flex-col lg:flex-row justify-evenly mx-auto'>
                <div className='w-full lg:w-11/12'>
                  <ProductList products={products} />
                </div>
              </section>
            ) : (
              <div className='mt-20'>
                <NoOrderProductState
                  heading={`Looks like you haven't added any product to your store.`}
                  href={"/dashboard/provider/products/add"}
                  buttonText='Add Product'
                  image={"/empty_store.svg"}
                />
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
  } = await axios.get(`${process.env.HOST_URL}/api/store?userId=${session.userId}`);
  if (session.userDetails.category !== "provider" || !store || !store.approved) {
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

  if (store) {
    const { data } = await axios.get(`${process.env.HOST_URL}/api/products?storeId=${store._id}`);
    products = data.products;
  }

  return {
    props: {
      session,
      store,
      products,
    },
  };
};

export default ProductIndex;
