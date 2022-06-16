import React from "react";
import { Link } from "react-router-dom";

const data = [
  "Armchair",
  "Bed",
  "Bedside table",
  "Closet",
  "Bookcase",
  "Computer Table",
  "Dresser",
  "Pouf",
  "Round chair",
  "Dining Table",
  "Stool",
  "Sofa",
  "Wardrobe",
  "Mirror",
];

const Category = () => {
  return (
    <>
      <div className="container bg-slate-100 m-5 mx-auto px-4">
        <div className="items-center ">
          <h2 className="text-center text-natural_teak border-b-2 p-2 text-xl">
            Explore Our Furniture Range!{" "}
          </h2>
          <div className="flex-row flex flex-wrap p-4 text-center place-content-center ">
            {data.map((ele) => (
              <Link
                to={`/category/${ele.toLowerCase()}`}
                className="hover:text-orangepeel"
                key={ele}
              >
                <img
                  src={`/Assets/images/Category/${ele}.svg`}
                  alt={`${ele}`}
                  className="hover:scale-125 m-2 w-24"
                />
                {`${ele}`}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
