import React from "react";
import StarRating from "../components/Utils/StarRating";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    console.log("length", length);

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    console.log("totalReduced", totalReduced);

    let highest = length * 5;
    console.log("highest", highest);

    let result = (totalReduced * 5) / highest;
    console.log("result", result);

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating ratingValue={result} />
        </span>
      </div>
    );
  }
};
