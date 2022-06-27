import React, { useState, useEffect } from "react";
import { Link, useParams , useNavigate} from "react-router-dom";
import { getProduct, getRelated, productStar } from "../../functions/product";
import StarRating from "react-star-ratings"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { HeartIcon, ShoppingCartIcon, StarIcon } from "@heroicons/react/outline";
import RelatedItem from "./RelatedItem";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { showAverage } from "../../functions/rating";
import { addToWishlist } from "../../functions/user";
import {toast} from "react-toastify";


const ProductOverView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  const { slug } = useParams();

  useEffect(() => {
    loadSingleProducts();
  }, [slug]);

  // useEffect(() => {
  //   if (products.ratings && user) {
  //     let existingRatingObject = products.ratings.find(
  //       (ele) => ele.postedBy.toString() === user._id.toString()
  //     );
  //     existingRatingObject && setStar(existingRatingObject.star); // current user's star
  //   }
  // });

  const loadSingleProducts = () => {
    setLoading(true);
    getProduct(slug)
      .then((res) => {
        setProducts(res.data);
        getRelated(res.data._id).then((res) => setRelated(res.data));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

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
        ...products,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip

      // add to redux state
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

  //star Rating
  // const onStarClick = (newRating, name) => {
  //   setStar(newRating);
  //   console.table(newRating, name);
  //   productStar(name, newRating, user.token).then((res) => {
  //     console.log("rating clicked", res.data);
  //     loadSingleProducts(); // if you want to show updated rating in real time
  //   });
  // };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    if (!user?.token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    addToWishlist(products._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      
    });
  };

  return (
    <>
      <section className="bg-gray-50 py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="bg-white border border-gray-200 shadow-sm rounded mb-5 p-4 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <aside>
                <div className="border border-gray-200 p-3 text-center rounded mb-5">
                  <Carousel autoPlay>
                    {products.images &&
                      products.images.map((i) => (
                        <div key={i.public_id}>
                          <img src={i.url} alt={products.slug.split(" ")} />
                        </div>
                      ))}
                  </Carousel>
                </div>
              </aside>
              <main>
                <h2 className="font-semibold text-2xl mb-4">
                  {products.title}
                </h2>
                <div className="flex flex-wrap items-center space-x-4 mb-3">
                {products && products.ratings && products.ratings.length > 0 ? (
        showAverage(products)
      ) : (
        <div className="text-center pt-1 pb-3">No Ratings Yet</div>
      )}
                  {/* <StarRating  name={products._id}
                  numberOfStars={5}
                  rating={3}
                  changeRating={(newRating , name) =>{
                    console.log("new" , newRating , name)
                  }}
                  isSelectable={false}
                  starRatedColor="rgb(255, 188, 11)"
                  starHoverColor="rgb(255, 188, 11)"
                  starDimension="1.5rem"
                  starSpacing=".25rem"

                  
                  /> */}
                  <span className="text-yellow-500">9.3</span>

                  <svg
                    width="6px"
                    height="6px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                  </svg>

                  {products.sold > 0 && <>
                  <span className="text-gray-400">
                    <i className="fa fa-shopping-bag mr-2"></i>
                    {products.sold} Orders
                  </span>

                  <svg
                    width="6px"
                    height="6px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                  </svg>
                  </>}

                  <span className="text-green-500">Verified</span>
                </div>
                <p className="mb-4 font-semibold text-xl">
                  ₹ {products.sellprice}
                  <span className="text-xs font-normal text-gray-500 ml-1 text-ellipsis line-through">
                    {" "}
                    {`₹ ${products.price}`}
                  </span>
                  <span className="mx-3">
                    {`${((products.sellprice / products.price) * 100).toFixed(
                      2
                    )} % off`}
                  </span>
                </p>
                <p className="mb-4 text-gray-500">{products.description}</p>
                <ul className="mb-5">
                  <li className="mb-1">
                    {" "}
                    <b className="font-medium w-36 inline-block">Category:</b>
                    <span className="text-gray-500">{""}</span>
                  </li>
                  <li className="mb-1">
                    {" "}
                    <b className="font-medium w-36 inline-block">Size:</b>
                    <span className="text-gray-500">{products.size}</span>
                  </li>
                  <li className="mb-1">
                    {" "}
                    <b className="font-medium w-36 inline-block">Delivery:</b>
                    <span className="text-gray-500">All Over India</span>
                  </li>
                  <li className="mb-1">
                    {" "}
                    <b className="font-medium w-36 inline-block">Finish:</b>
                    <span className="text-gray-500">{products.finish}</span>
                  </li>
                </ul>

                <hr />
                <div className="flex flex-wrap gap-3 mt-4">
                  {/* <Link
                    className="px-4 py-2 inline-flex text-white bg-yellow-500 border border-transparent rounded-md hover:bg-yellow-600"
                    to="/"
                  >
                    Buy now
                  </Link> */}

                  <Link
                    className="px-3 py-2 inline-flex align-middle items-center text-white bg-amber-800 border border-transparent rounded-md hover:bg-amber-900"
                    to="#"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-2 hover:text-orangepeel" />
                    Add to cart
                  </Link>

                  <Link
                    className="mx-2 px-3 py-2  inline-flex align-middle text-red-600 border border-gray-300 rounded-md hover:bg-gray-100"
                    to="#"
                    onClick={handleAddToWishlist}
                  >
                    <HeartIcon className="h-6 w-6 hover:fill-red-600 " />
                    Save for later
                  </Link>
                  
                  <button
                    className="mx-1 px-3 py-2  inline-flex align-middle text-orangepeel border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    <StarIcon className=" mr-2 h-6 w-6 hover:fill-orangepeel " />
                    Give Ratings
                  </button>
                 
                </div>
              </main>
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
      <RelatedItem related={related} product={products} />
    </>
  );
};

export default ProductOverView;
