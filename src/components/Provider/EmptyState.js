import Link from 'next/link';
import { BiStore } from 'react-icons/bi';

export const EmptyState = () => {
  return (
    <Link href={'/dashboard/provider/store/add'}>
      <button className='relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <div className='inline-block mx-auto'>
          <BiStore size={60} color='#aaa' />
        </div>
        <span className='mt-2 block text-lg font-medium uppercase text-gray-400'>
          Create Store
        </span>
      </button>
    </Link>
  );
};
