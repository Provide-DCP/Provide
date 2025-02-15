/* This example requires Tailwind CSS v2.0+ */

import { useSession } from "next-auth/react";

export default function Example() {
  return (
    <div className='text-center mt-48'>
      <h3 className='mt-2 text-sm font-medium text-gray-900'>Verification Pending...</h3>
      <p className='mt-1 text-sm text-gray-500'>
        Please check you registered email for verification link.
      </p>
    </div>
  );
}
