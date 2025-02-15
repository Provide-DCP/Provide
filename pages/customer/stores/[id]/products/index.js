import React from "react";
import { ProductList } from "../../../../../src/components/Shared/ProductList";
import { getSession } from "next-auth/react";
import axios from "axios";

const ProductIndex = ({ store, products }) => {
  return (
    <main className='  mt-[2%]'>
      <section className='flex flex-col lg:flex-row justify-evenly mx-auto'>
        <div className='w-full'>
          <ProductList products={products} />
        </div>
      </section>
    </main>
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
  } = await axios.get(`${process.env.HOST_URL}/api/store/${context.query.id}`);

  let products = [];
  const { data } = await axios.get(
    `${process.env.HOST_URL}/api/products?storeId=${context.query.id}`
  );
  products = data.products;

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

  return {
    props: {
      session,
      store,
      products,
    },
  };
};

export default ProductIndex;
