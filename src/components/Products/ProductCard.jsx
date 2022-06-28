import React from "react";

import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";

const ProductCard = ({ product }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      //drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const { images, title, description, slug, sellprice, price, quantity } =
    product;

  return (
    <>
      <section className="p-5 py-5 bg-sky-50 text-center transform duration-500 cursor-pointer ">
        <Link to={`/product/${slug}`}>
          <img
            src={images && images.length ? images[0].url : "NO Image"}
            alt={slug}
            className="h-60 w-64 transform duration-500 hover:scale-110"
          />
        </Link>
        <div className="space-x-1 flex justify-center mt-4">
          {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <div className="text-center pt-1 pb-3">No Ratings Yet</div>
          )}
          {/* <span className="text-yellow-500">
            {"("}
            <span>{product.ratings && product.ratings.length}</span>
            {")"}
          </span> */}
        </div>
        <Link to={`/product/${slug}`}>
          <h1 className="text-xl mb-2">
            {title.slice(0, 50)}
            {title.length > 50 ? "..." : ""}
          </h1>
        </Link>
        {/* <p className="mb-5 overflow-clip">{description.slice(0, 20)}...</p> */}
        <p className="font-semibold mb-5">
          ₹ {sellprice}
          <span className="text-xs font-normal text-gray-500 ml-1 text-ellipsis line-through">
            {" "}
            {`₹ ${price}`}
          </span>
          <span className="mx-2 text-orangepeel">
            {`${((sellprice / price) * 100).toFixed(2)} % off`}
          </span>
        </p>

        <button
          onClick={handleAddToCart}
          className="p-2 px-6 bg-amber-800 text-white rounded-md hover:bg-amber-900"
          disabled={quantity < 1}
        >
          {quantity < 1 ? "Out of Stock" : "Add to Cart"}
        </button>
      </section>
    </>
  );
};

export default ProductCard;
