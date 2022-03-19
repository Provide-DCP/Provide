import React from "react";
import { ProductList } from "../../../../src/components/Shared/ProductList";

const ProductIndex = () => {
  return (
    <main className="md:ml-[14%] mt-[2%]">
      <section className="flex flex-col lg:flex-row justify-evenly mx-auto">
        <div className="w-full lg:w-11/12">
          <ProductList />
        </div>
      </section>
    </main>
  );
};

export default ProductIndex;
