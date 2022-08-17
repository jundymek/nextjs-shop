import { useGetProductReviewsBySlugQuery } from "generated/graphql";
import React from "react";

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
    <div className="w-full px-10">
      {data.reviews.map((review) => (
        <div key={review.id}>
          <div>{review.name}</div>
          <div>{review.headline}</div>
          <div>{review.content}</div>
          <div>{review.rating}</div>
          <b>{review.id}</b>
        </div>
      ))}
    </div>
  );
};
