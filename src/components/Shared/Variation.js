import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";

export const Variation = ({ title, extraOptions, handleExtraOptions, deleteOption }) => {
  const [extra, setExtra] = useState({ name: "", price: 0 });
  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label htmlFor="extra" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
        {title}
      </label>
      <div>
        <div className="mt-1 flex items-center justify-between">
          <input
            className="max-w-lg mr-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            type="text"
            placeholder="Item"
            value={extra.name}
            name="name"
            onChange={handleExtraInput}
          />
          <input
            className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md mr-2"
            type="number"
            placeholder="Price"
            name="price"
            value={extra.price}
            onChange={handleExtraInput}
          />
          <div
            className="bg-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-blue-500 bg-blue-700 cursor-pointer text-white"
            onClick={(e) => handleExtraOptions(extra)}
          >
            Add
          </div>
        </div>
        <div className="flex flex-col w-full">
          {extraOptions.map((option) => (
            <div
              key={option.text}
              className="flex justify-between items-center border-2 my-1 px-4 py-2 rounded-md"
            >
              <div className="flex items-center">
                <p className="uppercase text-xs font-semibold tracking-wide">{option.name}</p>
                <span className="mx-5">-</span>
                <p className="text-sm font-semibold">
                  Rs.{" "}
                  <span className="text-sm font-semibold tracking-wide uppercase">
                    {option.price}
                  </span>
                </p>
              </div>
              <div
                onClick={() => {
                  setExtra({
                    name: "",
                    price: 0,
                  });
                  deleteOption(option);
                }}
                className="text-red-600 hover:text-red-400 text-lg cursor-pointer"
              >
                <RiCloseFill />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
