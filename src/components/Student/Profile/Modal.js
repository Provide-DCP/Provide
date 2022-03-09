import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useSession } from 'next-auth/react';
import { GrClose } from 'react-icons/gr';
import Loader from '../../Layouts/Loader';

export const Modal = ({ isOpen, closeModal }) => {
  const { data: session, status } = useSession();
  return (
    <Fragment>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className={`${
            isOpen
              ? 'fixed w-full h-screen top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-10 cursor-pointer fixed inset-0 z-20 overflow-y-auto'
              : 'fixed inset-0 z-10 overflow-y-auto'
          } `}
          onClose={closeModal}
        >
          <div className='min-h-screen  px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            <span
              className='inline-block bg-white z-10 h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block  w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl'>
                <div className='flex items-center justify-between'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Profile Image
                  </Dialog.Title>

                  <button
                    type='button'
                    className='inline-flex justify-center p-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none'
                    onClick={closeModal}
                  >
                    <GrClose size={15} />
                  </button>
                </div>
                <div className='mt-5 w-full'>
                  {status === 'loading' ? (
                    <div className='flex h-40 items-center justify-center'>
                      <Loader height='10' width='10' color='gray' />
                    </div>
                  ) : (
                    <div>
                      <img
                        className='w-full'
                        src={session?.userDetails?.image}
                        alt='profile-image'
                      />
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};
