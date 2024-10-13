import React from "react";

interface ReviewSummaryProps {
  numReviews: number;
}

const ReviewSummary = () => {
  return (
    <div>
      <div className="flex flex-row items-center gap-2">
        <div className="p-2 bg-green-500 text-white">4.4</div>
        <div>
          <p>Good</p>
          <p>10,000 Reviews</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
