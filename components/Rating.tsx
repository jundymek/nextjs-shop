interface RatingProps {
  rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
  const numberOfFullStars = Math.floor(rating);
  const isHalfStar = rating % 1 !== 0;
  
  return (
    <div className="text-blue-500 font-bold">
      <span className="flex items-center">
        {[...Array(numberOfFullStars)].map((_, i) => (
          <>
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              className="w-4 h-4 text-indigo-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
            </svg>
          </>
        ))}
        {isHalfStar && (
          <svg
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            className="w-4 h-4 text-indigo-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z" />
          </svg>
        )}
        <span className="text-gray-600 ml-3">4 Reviews</span>
      </span>
    </div>
  );
};
