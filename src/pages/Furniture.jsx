import { Link } from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import { HeartIcon, StarIcon } from "@heroicons/react/outline";
import { showAverage } from "../functions/rating";
import "rc-slider/assets/index.css";
import Range from "rc-slider";
import StarRatings from "react-star-ratings";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Furniture = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [finishes, setFinishes] = useState([
    "Walnut",
    "Natural Teak",
    "Teak",
    "Natural",
    "Dark Walnut",
  ]);
  const [finish, setFinish] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };



  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setFinish("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // // 4. load products based on category
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setFinish("");
    setShipping("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");

    setFinish("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  // 6. show products by sub category
  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setFinish("");
    setShipping("");
    fetchProducts({ sub });
  };

  // 8. show products based on color

  const handleFinish = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setFinish(e.target.value);
    setShipping("");
    fetchProducts({ finish: e.target.value });
  };

  // 9. show products based on shipping yes/no

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    // setStar("");

    setFinish("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <>
      <section className="py-12">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <aside className="md:w-1/3 lg:w-1/4 px-4">
              <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
                <h3 className="font-semibold mb-2">Category</h3>
                <ul className="text-gray-500 space-y-1">
                  {categories.map((c) => (
                    <li key={c._id}>
                      <label className="flex items-center">
                        <input
                          onChange={handleCheck}
                          className=""
                          value={c._id}
                          name="category"
                          type="checkbox"
                          checked={categoryIds.includes(c._id)}
                        />
                        <span className="ml-2 text-gray-500"> {c.name} </span>
                      </label>
                    </li>
                  ))}
                </ul>

                <hr className="my-4" />
                <h3 className="font-semibold mb-2">Sub-Category</h3>
                <div className="text-gray-500 space-y-1">
                  {subs.map((s) => (
                    <div key={s._id}>
                      <div
                        className=""
                        value={s._id}
                        name="category"
                        type="checkbox"
                        onClick={() => handleSub(s)}
                      >
                        <span className="ml-2 text-gray-500"> {s.name} </span>
                      </div>
                    </div>
                  ))}
                </div>
                <hr className="my-4" />
                <h3 className="font-semibold mb-2">Price</h3>
                <ul className="space-y-1">
                  <li>
                    <label
                      htmlFor="pricerange"
                      className="flex items-center flex-col"
                    >
                      <div className="flex flex-row justify-between w-full my-2">
                        <span className="ml-2 text-gray-500 mx-1"> Min </span>
                        <span className="ml-2 text-gray-500"> Max </span>
                      </div>
                      {/* <input
                  type="range"
                  className="w-full  bg-gray-200 rounded-lg appearance-none cursor-pointer z-50  "
                  id="pricerange"
                  min={0}
                  max={100000}
                  step={500}
                  value={price}
                  onChange={handleSlider}
                  defaultValue={0}
                /> */}
                      <Range />₹ {price}
                    </label>
                  </li>
                </ul>

                <hr className="my-4" />
                <h3 className="font-semibold mb-2">Star Rating</h3>
                <div className="space-y-1">
                  <StarRatings
                    numberOfStars={5}
                    changeRating={handleStarClick}
                    isSelectable={true}
                    starRatedColor="rgb(255, 188, 11)"
                    starHoverColor="rgb(255, 188, 11)"
                    starDimension="1.5rem"
                    starSpacing=".25rem"
                  />
                </div>

                <hr className="my-4" />
                <h3 className="font-semibold mb-2">Finish</h3>
                <ul className="space-y-1">
                  {finishes.map((f) => (
                    <li>
                      <label className="flex items-center" key={f}>
                        <input
                          value={f}
                          name={f}
                          checked={f === finish}
                          type="checkbox"
                          onChange={handleFinish}
                          className="h-4 w-4"
                        />
                        <span className="ml-2 text-gray-500">{f}</span>
                      </label>
                    </li>
                  ))}
                </ul>

                <hr className="my-4" />

                <h3 className="font-semibold mb-2">Shipping</h3>
                <ul className="space-y-1">
                  <li>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        onChange={handleShippingchange}
                        value="Yes"
                        checked={shipping === "Yes"}
                        className="h-4 w-4"
                      />
                      <span className="ml-2 text-gray-500"> Yes </span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        onChange={handleShippingchange}
                        value="No"
                        checked={shipping === "No"}
                        className="h-4 w-4"
                      />
                      <span className="ml-2 text-gray-500"> No </span>
                    </label>
                  </li>
                </ul>
              </div>
            </aside>

            {/* //Main Side */}
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <div className="flex flex-row justify-between mb-3 ">
                <h2>{"Furniture"}</h2>
                <form>
                  <label htmlFor="sort" className="mx-2">Sort By:</label>
                  <select name="sort" id="sort" className="mx-2">
                    <option>Popular</option>
                    <option>Best Sellers</option>
                    <option>Price - Low to High</option>
                    <option>Price - High to Low</option>
                  </select>
                </form>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div key={p._id}>
                    <article className="shadow-sm  p-5 py-5 bg-sky-50 text-center transform duration-500 cursor-pointer">
                      <Link
                        to={`/product/${p.slug}`}
                        className="block relative p-1"
                      >
                        <img
                          src={p.images?.[0].url}
                          className="h-60 w-64 transform duration-500 hover:scale-110"
                          height="240"
                          alt={p.title}
                        />
                      </Link>
                      <div className="p-2 border-t border-t-gray-200">
                        <div className="space-x-1 flex justify-center">
                          {p && p.ratings && p.ratings.length > 0 ? (
                            showAverage(p)
                          ) : (
                            <div className="text-center pt-1 pb-3">
                              No Ratings Yet
                            </div>
                          )}
                        </div>

                        <Link
                          to={`/product/${p.slug}`}
                          className="block text-gray-600 mb-2 hover:text-bistre "
                        >
                          {p.title}
                        </Link>
                        <p className="font-semibold mb-2">₹ {p.sellprice}</p>
                        <div className="flex justify-between">
                          <button className="px-4 py-2 inline-block text-white text-center bg-amber-800 border border-transparent rounded-md hover:bg-amber-900">
                            Add to cart
                          </button>
                          <button className="mx-3 px-3 py-2 inline-block text-red-700  border border-gray-300 rounded-md hover:bg-gray-100">
                            <HeartIcon className="h-6 w-6 active:fill-red-700 " />
                          </button>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Furniture;
