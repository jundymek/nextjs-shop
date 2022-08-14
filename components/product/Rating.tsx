import { StarEmptyIcon } from "../icons/StarEmptyIcon";
import { StarFullIcon } from "../icons/StarFullIcon";
import { StarHalfIcon } from "../icons/StarHalfIcon";

interface RatingProps {
  rating: number;
  setIsProductReviewsOpen: (isProductReviewsOpen: boolean) => void;
}

export const Rating = ({ rating, setIsProductReviewsOpen }: RatingProps) => {
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
        <button className="text-gray-600 ml-3" onClick={() => setIsProductReviewsOpen(true)}>
          4 Reviews
        </button>
      </div>
    </div>
  );
};
