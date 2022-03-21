import React from "react";

export const ProductOptionDisplay = ({ name, options }) => {
  return (
    <>
      <h2>{name}</h2>
      <div className='text-xl font-light mb-4 mt-2'>
        {options?.map((option, index) => {
          return (
            <p
              className='inline-block border rounded-md bg-gray-100 py-1 px-3 mr-3 text-base'
              key={index}
            >
              {option.name} - Rs.{option.price}
            </p>
          );
        })}
      </div>
    </>
  );
};
