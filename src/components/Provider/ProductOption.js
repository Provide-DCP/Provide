import React from "react";
import { RadioGroup } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

export const ProductOption = ({ name, options, selected, setSelected }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h4 className="text-sm text-gray-900 font-medium">{name}</h4>
        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          {name} guide
        </a>
      </div>

      <RadioGroup value={selected} onChange={setSelected} className="mt-4">
        <RadioGroup.Label className="sr-only">Choose a {name}</RadioGroup.Label>
        <div className="grid grid-cols-4 gap-4">
          {options.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active }) =>
                classNames(
                  "bg-white shadow-sm text-gray-900 cursor-pointer",
                  active ? "ring-2 ring-indigo-500" : "",
                  "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
                  <div
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-indigo-500" : "border-transparent",
                      "absolute -inset-px rounded-md pointer-events-none"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
