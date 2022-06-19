import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => setRating(rate);
  return (
    <>
      <div className="container px-4 md:px-3 mt-5 pt-5">
        <div className="row mb-5 md:pb-4 items-center">
          <div className="col-12 col-lg-10 mx-auto">
            <div className="box">
              <h3>Ratings</h3>
              <div className="demo">
                <Rating
                  onClick={handleRating}
                  ratingValue={rating}
                  size={30}
                  transition
                  //   allowHalfIcon
                  //   showTooltip
                  className=""
                  style={{display : "grid"}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StarRating;
