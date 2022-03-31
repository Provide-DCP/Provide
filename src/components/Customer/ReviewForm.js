import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
export const ReviewForm = ({ rating, review, setRating, setReview, handleCreate }) => {
  return (
    <div>
      <div className='flex mb-2 justify-between'>
        {[1, 2, 3, 4, 5].map((x) => {
          return (
            <div
              key={x}
              className={`${x <= rating ? "text-yellow-400" : "text-gray-200"}`}
              onClick={() => setRating(x)}
            >
              <AiTwotoneStar size={32} />
            </div>
          );
        })}
      </div>
      <textarea
        placeholder='How was the product..'
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className='rounded-md'
      />
      <div
        onClick={handleCreate}
        className={`mb-3 flex justify-center cursor-pointer py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700`}
      >
        Post Review
      </div>
    </div>
  );
};
