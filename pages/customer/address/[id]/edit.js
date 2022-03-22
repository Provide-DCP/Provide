import { getSession, useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { reloadSession } from "../../../src/lib/helper";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Header } from "../../../../src/components/Layouts/Header";

const country = [{ id: 1, name: "India" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CustomerAdd = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const address = session?.userDetails?.addresses.filter(
    (x) => x._id.toString() === id.toString()
  )[0];
  const [name, setName] = useState(address?.name);
  const [phone, setPhone] = useState(address?.phone);
  const [building, setBuilding] = useState(address?.building);
  const [area, setArea] = useState(address?.area);
  const [landmark, setLandmark] = useState(address?.landmark);
  const [city, setCity] = useState(address?.city);
  const [state, setState] = useState(address?.region);
  const [pincode, setPincode] = useState(address?.pincode);
  const [selectedCountry, setSelectedCountry] = useState({
    name: address?.country,
  });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.put("/api/users/address", {
      userId: session.userId,
      addressId: id,
      name,
      phone,
      pincode,
      building,
      area,
      landmark,
      region: state,
      city,
      country: selectedCountry.name,
    });
    reloadSession();
    toast.success(data.message, { toastId: data.message });
    router.push("/address");
  };
  return (
    <>
      <Header heading={"Edit Address"} />
      <main className="relative -mt-40">
        <div className="w-[86%] mx-auto flex text-base text-left w-full md:my-8 md:align-middle">
          <div className="rounded-lg shadow w-full relative bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <form className="space-y-8 divide-y divide-gray-200" onSubmit={onSubmitHandler}>
              <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="py-8 space-y-6 sm:pt-10 sm:space-y-5">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Address</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Use address where you can receive order.
                    </p>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Full Name
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="given-name"
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 ">
                      <Listbox value={selectedCountry} onChange={setSelectedCountry}>
                        {({ open }) => (
                          <>
                            <Listbox.Label className="flex items-center h-full block text-sm font-medium text-gray-700">
                              Country
                            </Listbox.Label>
                            <div className="mt-1 relative">
                              <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span className="block truncate">{selectedCountry.name}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                  <SelectorIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                  {country.map((person) => (
                                    <Listbox.Option
                                      key={person.id}
                                      className={({ active }) =>
                                        classNames(
                                          active ? "text-white bg-indigo-600" : "text-gray-900",
                                          "cursor-default select-none relative py-2 pl-3 pr-9"
                                        )
                                      }
                                      value={person}
                                    >
                                      {({ selectedCountry, active }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              selectedCountry ? "font-semibold" : "font-normal",
                                              "block truncate"
                                            )}
                                          >
                                            {person.name}
                                          </span>

                                          {selectedCountry ? (
                                            <span
                                              className={classNames(
                                                active ? "text-white" : "text-indigo-600",
                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                              )}
                                            >
                                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Building
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          value={building}
                          onChange={(e) => setBuilding(e.target.value)}
                          autoComplete="street-address"
                          className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Area
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          autoComplete="street-address"
                          className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Landmark
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          autoComplete="street-address"
                          className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        City
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          autoComplete="address-level2"
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        State / Province
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="region"
                          id="region"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          autoComplete="address-level1"
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          autoComplete="postal-code"
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Mobile
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          autoComplete="tel"
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
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

  if (session.userDetails.category !== "customer") {
    return {
      redirect: {
        destination: `/dashboard/${session.userDetails.category}`,
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

  return {
    props: {
      session,
    },
  };
};

export default CustomerAdd;
