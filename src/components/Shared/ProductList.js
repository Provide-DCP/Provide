import React, { useState } from "react";
import { GridView } from "./GridView";
import { ListView } from "./ListView";
import { BsFillGrid3X3GapFill, BsList } from "react-icons/bs";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const ProductList = ({ products }) => {
  const [gridView, setGridView] = useState(true);
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mt-5 mb-10">
        <div className="flex w-16 justify-between">
          <button
            className={gridView === true ? "bg-gray-800 rounded-md text-white p-1" : ""}
            onClick={() => setGridView(true)}
          >
            <BsFillGrid3X3GapFill size={20} />
          </button>
          <button
            className={gridView === true ? "" : "bg-gray-800 rounded-md text-white p-1"}
            onClick={() => setGridView(false)}
          >
            <BsList size={24} />
          </button>
        </div>
        <p className="hidden md:block text-lg font-semibold text-gray-700">
          {products?.length} Products Found
        </p>

        <div className="flex items-center justify-between w-28">
          <a
            href="/dashboard/provider/products/add"
            className={` ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700`}
          >
            Add
          </a>
        </div>
      </div>

      {gridView === true ? <GridView products={products} /> : <ListView products={products} />}
    </div>
  );
};
