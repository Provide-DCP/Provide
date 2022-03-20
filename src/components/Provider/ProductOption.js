import React from "react";
import { RadioGroup } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

export const ProductOption = ({ name, options, selected, setSelected }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className='mt-10'>
      <div className='flex items-center justify-between'>
        <h4 className='text-sm text-gray-900 font-medium'>{name}</h4>
        <a href='#' className='text-sm font-medium text-indigo-600 hover:text-indigo-500'>
          {name} guide
        </a>
      </div>

      {name !== "Topping" ? (
        <div className='flex flex-wrap'>
          <RadioGroup value={selected} onChange={setSelected} className='mt-4'>
            <RadioGroup.Label className='sr-only'>Choose a {name}</RadioGroup.Label>
            <div className='inline-flex flex-wrap'>
              {options.map((option) => (
                <RadioGroup.Option
                  key={option.name}
                  value={option}
                  className={({ active }) =>
                    classNames(
                      "bg-white shadow-sm text-gray-900 cursor-pointer",
                      active ? "ring-2 ring-indigo-500" : "",
                      "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none mr-4"
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <RadioGroup.Label as='p'>
                        {option.name} -{" "}
                        <span className='text-sm font-normal text-lowercase'>
                          Rs. {option.price}
                        </span>
                      </RadioGroup.Label>
                      <div
                        className={classNames(
                          active ? "border" : "border-2",
                          checked ? "border-indigo-500" : "border-transparent",
                          "absolute -inset-px rounded-md pointer-events-none"
                        )}
                        aria-hidden='true'
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      ) : (
        <fieldset className='space-y-5 mt-2'>
          <div className='relative flex flex-wrap justify-start'>
            {options.map((option) => {
              return (
                <div key={option.id} className='flex mr-4'>
                  <div className='flex items-center h-5 w-6'>
                    <input
                      id={option.title}
                      name={option.title}
                      type='checkbox'
                      onChange={(e) => {
                        const id = selected.indexOf(option.title);
                        if (id == -1) setSelected([...selected, option.title]);
                        else {
                          const cat = selected;
                          cat.splice(id, 1);
                          setSelected([...cat]);
                        }
                      }}
                      className='h-4 w-4 text-indigo-600 border-gray-300 rounded'
                    />
                  </div>
                  <div className='ml-1 text-sm'>
                    <label htmlFor={option.title} className='font-medium text-gray-700'>
                      {option.name} - Rs. {option.price}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </fieldset>
      )}
    </div>
  );
};
