/* eslint-disable @next/next/no-img-element */
import React from "react";

export const ListView = ({ products }) => {
  return (
    <div className="flex flex-col max-w-11/12 mx-auto">
      {products.map((product, index) => (
        <div key={index} className="flex flex-col md:flex-row my-5 md:items-center">
          <img
            className="w-80 md:mr-10 h-48 object-cover rounded-md"
            src={product.imageSrc}
            alt=""
          />
          <div className="w-full mt-4 md:mt-0 md:w-2/3">
            <h2 className="text-xl mb-1 font-bold tracking-wide">{product.name}</h2>
            <h3 className="text-indigo-700 text-lg font-semibold">{product.price}</h3>
            <p className="mt-1 mb-3 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam animi tenetur amet
              dolores, omnis ducimus laudantium fugiat laboriosam inventore ullam?
            </p>
            <a className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
              Details
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
