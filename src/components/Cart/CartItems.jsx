import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/outline";

const CartItems = ({ c }) => {
  let dispatch = useDispatch();

  const handleCount = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > c.quantity) {
      toast.error(`Max available quantity: ${c.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == c._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === c._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <>
      <td className="hidden pb-4 md:table-cell">
        <a href={`/product/${c.slug}`}>
          <img src={c.images?.[0].url} className="w-20 rounded" alt={c.title} />
        </a>
      </td>
      <td>
        <Link to={`/product/${c.slug}`}>
          <p className="mb-2 md:ml-4">{c.title.slice(0, 50)}</p>
        </Link>
        <button type="submit" className="text-gray-700 md:ml-4">
          <small>
            <TrashIcon onClick={handleRemove} className="w-4 h-4" />
          </small>
        </button>
        <span className="ml-4 text-gray-500 text-sm">Finish : {c.finish}</span>
      </td>
      <td className="justify-center md:justify-end md:flex mt-6">
        <div className="w-20 h-10">
          <div className="relative flex flex-row w-full h-8">
            <input
              onChange={handleCount}
              type="number"
              value={c.count}
              className="w-full font-semibold text-center rounded-md text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
            />
          </div>
        </div>
      </td>
      <td className="hidden text-right md:table-cell">
        <span className="text-sm lg:text-base font-medium">
          ₹ {c.sellprice}
        </span>
      </td>
      <td className="text-right">
        <span className="text-sm lg:text-base font-medium">
          ₹ {c.sellprice * c.count}
        </span>
      </td>
    </>
  );
};

export default CartItems;
