import { useGetProductReviewsBySlugQuery } from "generated/graphql";
import React from "react";

interface ProductReviewsProps {
  productSlug: string;
}

export const ProductReviews = ({ productSlug }: ProductReviewsProps) => {
  const reviews = useGetProductReviewsBySlugQuery({
    variables: {
      slug: productSlug,
    },
  });
  console.log(reviews);
  return (
    <div className="w-full px-10">
      {reviews.data?.reviews.map((review) => (
        <div key={review.id}>
          <div>{review.name}</div>
          <div>{review.headline}</div>
          <div>{review.content}</div>
          <div>{review.rating}</div>
        </div>
      ))}
    </div>
  );
};
