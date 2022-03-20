import React from 'react';
import { getSession } from 'next-auth/react';
import { ProductList } from '../../../src/components/Shared/ProductList';

const index = () => {
  return (
    <main className='md:ml-[14%]'>
      <section className='flex flex-col lg:flex-row justify-evenly w-11/12 mx-auto'>
        <div className='w-full lg:w-11/12'>
          <ProductList />
        </div>
      </section>
    </main>
  );
};

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth/signin',
//         permanent: false,
//       },
//     };
//   }

//   if (!session.userDetails) {
//     return {
//       redirect: {
//         destination: '/auth/user/details',
//         permanent: false,
//       },
//     };
//   }

//   if (session.userDetails.category !== 'customer') {
//     return {
//       redirect: {
//         destination: `/dashboard/${session.userDetails.category}`,
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       session: session,
//     },
//   };
// };

export default index;
