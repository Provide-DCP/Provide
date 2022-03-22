/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
export const ReviewCard = ({ review }) => {
  return (
    <div className="w-full mb-5 shadow p-4 border rounded-md border-gray-100">
      <div className="flex justify-start">
        <div className="mr-3">
          <img
            src={review.userdetails.image}
            className="h-12 w-12 rounded-full"
            alt="product-image"
          />
        </div>
        <div>
          <div className="font-bold">
            {review.userdetails.firstName + " " + review.userdetails.lastName}
          </div>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((x) => {
              return (
                <div
                  key={x}
                  className={`${x <= review.rating ? "text-yellow-400" : "text-gray-200"}`}
                  onClick={() => setRating(x)}
                >
                  <AiTwotoneStar size={20} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <p className="text-semibold text-gray-500 mt-3 italic">{review.review}</p>
      </div>
    </div>
  );
};
