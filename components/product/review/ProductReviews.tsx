import { useGetProductReviewsBySlugQuery } from "generated/graphql";
import React from "react";
import { Rating } from "../Rating";

interface ProductReviewsProps {
  productSlug: string;
}

export const ProductReviews = ({ productSlug }: ProductReviewsProps) => {
  const { data, loading, error } = useGetProductReviewsBySlugQuery({
    variables: {
      slug: productSlug,
    },
  });
  console.log(data);
  if (!data) {
    return null;
  }
  return (
    <section className="px-10 mt-4">
      <h2 className="text-center text-2xl text-indigo-500">Customer Reviews</h2>
      <ul className="w-full my-2">
        {data.reviews.map((review) => (
          <li key={review.id} className="flex flex-col border shadow-md p-4 my-4 relative">
            <h3 className="text-center mb-2 text-xl text-gray-500">{review.headline}</h3>
            <p>{review.content}</p>
            {review.rating && (
              <div className="absolute top-2 right-2">
                <Rating rating={review.rating} />
              </div>
            )}
            <span className="italic self-end">{review.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
