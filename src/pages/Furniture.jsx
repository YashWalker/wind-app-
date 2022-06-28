import Filters from "../components/Utils/Filters";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import { HeartIcon } from "@heroicons/react/outline";
import { showAverage } from "../functions/rating";

// import Star from "../components/forms/Star";

const Furniture = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

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

  // // 3. load products based on price range
  // useEffect(() => {
  //   console.log("ok to request");
  //   fetchProducts({ price });
  // }, [ok]);

  // const handleSlider = (value) => {
  //   dispatch({
  //     type: "SEARCH_QUERY",
  //     payload: { text: "" },
  //   });

  //   // reset
  //   setCategoryIds([]);
  //   setPrice(value);
  //   setStar("");
  //   setSub("");
  //   setBrand("");
  //   setColor("");
  //   setShipping("");
  //   setTimeout(() => {
  //     setOk(!ok);
  //   }, 300);
  // };

  // // 4. load products based on category

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);

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

  // // 5. show products by star rating
  // const handleStarClick = (num) => {
  //   // console.log(num);
  //   dispatch({
  //     type: "SEARCH_QUERY",
  //     payload: { text: "" },
  //   });
  //   setPrice([0, 0]);
  //   setCategoryIds([]);
  //   setStar(num);
  //   setSub("");
  //   setBrand("");
  //   setColor("");
  //   setShipping("");
  //   fetchProducts({ stars: num });
  // };

  // const showStars = () => (
  //   <div className="pr-4 pl-4 pb-2">
  //     <Star starClick={handleStarClick} numberOfStars={5} />
  //     <Star starClick={handleStarClick} numberOfStars={4} />
  //     <Star starClick={handleStarClick} numberOfStars={3} />
  //     <Star starClick={handleStarClick} numberOfStars={2} />
  //     <Star starClick={handleStarClick} numberOfStars={1} />
  //   </div>
  // );

  // // 6. show products by sub category
  // const showSubs = () =>
  //   subs.map((s) => (
  //     <div
  //       key={s._id}
  //       onClick={() => handleSub(s)}
  //       className="p-1 m-1 badge badge-secondary"
  //       style={{ cursor: "pointer" }}
  //     >
  //       {s.name}
  //     </div>
  //   ));

  // const handleSub = (sub) => {
  //   // console.log("SUB", sub);
  //   setSub(sub);
  //   dispatch({
  //     type: "SEARCH_QUERY",
  //     payload: { text: "" },
  //   });
  //   setPrice([0, 0]);
  //   setCategoryIds([]);
  //   setStar("");
  //   setBrand("");
  //   setColor("");
  //   setShipping("");
  //   fetchProducts({ sub });
  // };

  // 8. show products based on color

  const handleFinish = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);

    setFinish(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
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
            <Filters
              categoryIds={categoryIds}
              categories={categories}
              handleCheck={handleCheck}
              handleFinish={handleFinish}
              finishes={finishes}
              finish={finish}
              handleShippingchange={handleShippingchange}
              shipping={shipping}
            />
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <div className="flex flex-row justify-between ">
                <h2>{"Furniture"}</h2>
                <button type="button" className="products-filter-btn">
                  <i className="icon-filters"></i>
                </button>
                <form className="flex flex-row">
                  <div className="products__filter__select">
                    <h4>Show products: </h4>
                    <div className="select-wrapper">
                      <select>
                        <option>Popular</option>
                      </select>
                    </div>
                  </div>
                  <div className="products__filter__select">
                    <h4>Sort by: </h4>
                    <div className="select-wrapper">
                      <select>
                        <option>Popular</option>
                      </select>
                    </div>
                  </div>
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
                          <button
                            className="px-4 py-2 inline-block text-white text-center bg-amber-800 border border-transparent rounded-md hover:bg-amber-900"
                           
                          >
                            Add to cart
                          </button>
                          <button
                            className="mx-3 px-3 py-2 inline-block text-red-700  border border-gray-300 rounded-md hover:bg-gray-100"
                          >
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
