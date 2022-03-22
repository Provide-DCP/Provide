import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Disclosure } from "@headlessui/react";
import { GlobeAltIcon, LightningBoltIcon, ScaleIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LoginDropdown } from "../src/components/Layouts/LoginDropdown";
import { BsArrowRight } from "react-icons/bs";
import { FcNext } from "react-icons/fc";

const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // More questions...
];

const features = [
  {
    name: "Providers",
    description:
      "These are the category of users that bring joy to the rest. They provide the products at a cheaper rate or for free.",
    icon: GlobeAltIcon,
  },
  {
    name: "Customers",
    description:
      "These are the people who are in the need and can buy the products at a cheaper rate and avail the services.",
    icon: ScaleIcon,
  },
  {
    name: "Volunteers",
    description:
      "They are one of the stronger pillars of this app. They lend a helping hand when needed without expecting anything.",
    icon: LightningBoltIcon,
  },
];

const metrics = [
  {
    id: 1,
    stat: "8K+",
    emphasis: "Companies",
    rest: "use laoreet amet lacus nibh integer quis.",
  },
  {
    id: 2,
    stat: "25K+",
    emphasis: "Countries around the globe",
    rest: "lacus nibh integer quis.",
  },
  {
    id: 3,
    stat: "98%",
    emphasis: "Customer satisfaction",
    rest: "laoreet amet lacus nibh integer quis.",
  },
  {
    id: 4,
    stat: "12M+",
    emphasis: "Issues resolved",
    rest: "lacus nibh integer quis.",
  },
];

const content = [
  {
    description: "Provider sends a request for an account and waits for the approval.",
  },
  {
    description: "The customer places an order for the product.",
  },
  {
    description: "The customer recieves the address of the provider and the OTP to verify.",
  },
  {
    description: "The customer receives the product.",
  },
];

const volunteerFlow = [
  {
    description:
      "The volunteer registers with website for free. The volunteer can be any retired medical officer or any other experienced personnel with apt medical knowledge..",
  },
  {
    description:
      "The customer creates an account and registers himself with the website first and sends a request at the time of emergency using the website. He can either use the address that he has registered with or the current location.",
  },
  {
    description:
      "The volunteer reaches to the patients’ destination and gives him a first aid preventing from further deterioration in the health condition of the victim.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { data: session } = useSession();
  return (
    <div className='bg-white'>
      <main className='pt-[2%]'>
        {/* Hero section */}

        <div id='home' className='relative h-[500px]'>
          <div
            className='absolute inset-0 w-full -top-40'
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0, 0.2), rgba(0,0,0, 0.1)), url(/hero.webp) no-repeat center center fixed",
              backgroundSize: "cover",
            }}
          >
            <div className='absolute inset-0 mix-blend-multiply' aria-hidden='true' />
          </div>
          <div
            data-aos='fade-right'
            className='absolute bottom-5 max-w-7xl mx-auto pl-5 pt-12 sm:pt-12'
          >
            <h1 className='text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl'>
              PROVIDE
            </h1>
          </div>
        </div>

        {/* Alternating Feature Sections */}
        <div id='features' className='py-12 bg-white'>
          <div className='max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
            <h3 className='text-center font-semibold text-3xl text-gray-700 mt-10'>The Users</h3>
            <dl className='my-10 space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8'>
              {features.map((feature) => (
                <div key={feature.name} className='items-center rounded shadow px-6 py-3'>
                  <dt>
                    <div className='flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white'>
                      <feature.icon className='h-6 w-6' aria-hidden='true' />
                    </div>
                    <p className='mt-5 text-lg leading-6 font-medium text-gray-900'>
                      {feature.name}
                    </p>
                  </dt>
                  <dd className='mt-2 text-base text-gray-500'>{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <section
          id='flows'
          className='overflow-hidden flex flex-col items-center justify-center bg-gray-100'
        >
          <h3 className='font-semibold text-3xl text-gray-700 mt-10'>How it works</h3>
          <div>
            <h4 className='text-2xl text-center font-bold text-gray-500 mt-10'>Provider Flow</h4>
            <div className='w-full flex flex-wrap justify-center items-center mx-10'>
              {content &&
                content.map((card, key) => {
                  return (
                    <a
                      key={key}
                      className={`w-full mx-10 my-2 px-10 py-5 md:w-96 lg:w-72 relative flex flex-row md:flex-col items-stretch md:text-center bg-white md:mx-10 md:my-5 lg:mx-1 rounded-xl shadow-lg cursor-pointer border border-white hover:border-blue-600`}
                    >
                      <div className='flex flex-col h-32 justify-center md:items-stretch'>
                        {key != 3 ? (
                          <div
                            id='hello'
                            className={`hidden lg:block rounded-full w-8 h-8 bg-blue-100 absolute top-[65px] -right-6 z-10`}
                          >
                            <span className='absolute inset-1/4'>
                              <FcNext />
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                        <p className='text-medium text-gray-500 mt-2'>{card.description}</p>
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
          <div>
            <h4 className='text-2xl text-center font-bold text-gray-500 mt-10'>Volunteer Flow</h4>
            <div className='w-full flex flex-wrap justify-center items-center mx-10'>
              {volunteerFlow &&
                volunteerFlow.map((card, key) => {
                  return (
                    <a
                      key={key}
                      className={`w-full mx-10 my-2 px-10 py-5 md:w-96 lg:w-96 relative flex flex-row md:flex-col items-stretch md:text-center bg-white md:mx-10 md:my-5 lg:mx-1 rounded-xl shadow-lg cursor-pointer border border-white hover:border-blue-600`}
                    >
                      <div className='flex flex-col h-52 justify-center md:items-stretch'>
                        {key != 2 ? (
                          <div
                            id='hello'
                            className={`hidden lg:block rounded-full w-8 h-8 bg-blue-100 absolute top-[110px] -right-6 z-10`}
                          >
                            <span className='absolute inset-1/4'>
                              <FcNext />
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                        <p className='text-medium text-gray-500 mt-2'>{card.description}</p>
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
        </section>

        <div
          id='reviews'
          className='max-w-7xl mx-auto flex justify-center items-center text-center lg:justify-between lg:text-left my-5'
        >
          <div className='w-full px-10 lg:w-1/2 lg:px-6'>
            <h3 className='text-gray-600 text-3xl font-bold mb-5'>Customer Feedback</h3>
            <p className='text-lg text-gray-500 mb-5'>
              We consider the feedbacks or reviews given by the customers to the providers and take
              the right action.
            </p>
          </div>
          <div className='hidden lg:block lg:max-w-sm'>
            <img src='customerFeedback.png' alt='' />
          </div>
        </div>

        <div id='faq' className='bg-gray-50'>
          <div className='max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8'>
            <div className='max-w-3xl mx-auto divide-y-2 divide-gray-200'>
              <h2 className='text-center text-3xl font-extrabold text-gray-900 sm:text-4xl'>
                Frequently asked questions
              </h2>
              <dl className='mt-6 space-y-6 divide-y divide-gray-200'>
                {faqs.map((faq) => (
                  <Disclosure as='div' key={faq.question} className='pt-6'>
                    {({ open }) => (
                      <>
                        <dt className='text-lg'>
                          <Disclosure.Button className='text-left w-full flex justify-between items-start text-gray-400'>
                            <span className='font-medium text-gray-900'>{faq.question}</span>
                            <span className='ml-6 h-7 flex items-center'>
                              <ChevronDownIcon
                                className={classNames(
                                  open ? "-rotate-180" : "rotate-0",
                                  "h-6 w-6 transform"
                                )}
                                aria-hidden='true'
                              />
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Transition
                          enter='transition duration-100 ease-out'
                          enterFrom='transform scale-95 opacity-0'
                          enterTo='transform scale-100 opacity-100'
                          leave='transition duration-75 ease-out'
                          leaveFrom='transform scale-100 opacity-100'
                          leaveTo='transform scale-95 opacity-0'
                        >
                          <Disclosure.Panel as='dd' className='mt-2 pr-12'>
                            <p className='text-base text-gray-500'>{faq.answer}</p>
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='bg-white'>
          <div className='max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8'>
            <div className='bg-blue-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4'>
              <div className='pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20'>
                <div className='lg:self-center'>
                  <h2 className='text-3xl font-extrabold text-white sm:text-4xl'>
                    <span className='block'>Ready to get started?</span>
                    <span className='block'>Create an account.</span>
                  </h2>

                  <Link href='/auth/signin'>
                    <a className='mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-blue-600 hover:bg-blue-50'>
                      Get Started
                    </a>
                  </Link>
                </div>
              </div>
              <div className='-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1'>
                <img
                  className='transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-4 lg:translate-y-6'
                  src='/monitor.svg'
                  alt='App screenshot'
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer id='footer' className='bg-gray-50' aria-labelledby='footer-heading'>
        <div className='max-w-7xl mx-auto pb-8 px-4 sm:px-6 lg:px-8'>
          <div className='mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-center lg:mt-16'>
            <p className='mt-8 text-base text-gray-400 md:mt-0 md:order-1'>
              &copy; 2022 Provide, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
