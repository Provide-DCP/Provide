import React from "react";
import { ProductList } from "../../../../src/components/Shared/ProductList";
import { getSession } from "next-auth/react";
import axios from "axios";

const ProductIndex = ({ store, products }) => {
  return (
    <main className='md:ml-[14%] mt-[2%]'>
      <section className='flex flex-col lg:flex-row justify-evenly mx-auto'>
        <div className='w-full lg:w-11/12'>
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
  } = await axios.get("http://localhost:3000/api/store", {
    params: {
      userId: session.userId,
    },
  });
  if (session.userDetails.category !== "provider" || !store || !store.approved) {
    const category = session.userDetails.category;
    return {
      redirect: {
        destination:
          category === "customer" ? `/customer` : `/dashboard/${session.userDetails.category}`,
        permanent: false,
      },
    };
  }

  let products = [];

  if (store) {
    const { data } = await axios.get("http://localhost:3000/api/products", {
      params: {
        storeId: store._id,
      },
    });
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
