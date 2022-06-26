import { StarEmptyIcon, StarFullIcon, StarHalfIcon } from "components";

interface RatingProps {
  rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
  const numberOfFullStars = Math.floor(rating);
  const isHalfStar = rating % 1 !== 0;
  const numberOfAllStars = numberOfFullStars + (isHalfStar ? 1 : 0);
  return (
    <div className="text-blue-500 font-bold">
      <div className="flex items-center">
        {[...Array(numberOfFullStars)].map((_, i) => (
          <StarFullIcon key={i} />
        ))}
        {isHalfStar && <StarHalfIcon />}
        {[...Array(5 - numberOfAllStars)].map((x, i) => (
          <StarEmptyIcon key={i} />
        ))}
        <span className="text-gray-600 ml-3">4 Reviews</span>
      </div>
    </div>
  );
};
