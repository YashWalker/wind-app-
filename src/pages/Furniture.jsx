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
              <h2 className="text-center font-fonda text-xl p-2 m-2">
                "Woodkoof"
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div key={p._id}>
                    <article className="shadow-sm rounded bg-white border border-gray-200">
                      <Link
                        to={`/product/${p.slug}`}
                        className="block relative p-1"
                      >
                        <img
                          src={p.images?.[0].url}
                          className="mx-auto w-auto"
                          height="240"
                          alt={p.title}
                        />
                      </Link>
                      <div className="p-4 border-t border-t-gray-200">
                        <p className="font-semibold">₹ {p.sellprice}</p>
                        <Link
                          to={`/product/${p.slug}`}
                          className="block text-gray-600 mb-3 hover:text-blue-500"
                        >
                          {p.title}
                        </Link>
                        <div>
                          <Link
                            className="px-4 py-2 inline-block text-white text-center bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                            to="#"
                          >
                            Add to cart
                          </Link>
                          <Link
                            className="px-3 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100"
                            to="#"
                          >
                            <i className="fa fa-heart"></i>
                          </Link>
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
