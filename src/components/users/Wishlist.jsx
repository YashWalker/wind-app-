import UserSideBar from "../Navbar/UserSideBar";
import React, { useState, useEffect } from "react";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {HeartIcon } from "@heroicons/react/outline"

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [wish , setWish] = useState(true);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      // console.log(res);
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
     
      loadWishlist();
      setWish(false);
    });

  return (
    <>
      <div className="flex">
        <div>
          <UserSideBar />
        </div>
        <div>
          <div>
            <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
              <div className="flex flex-col jusitfy-start items-start">
                
                <div className="mt-3">
                  <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800  text-center ">
                   Your Favorite Item
                  </h1>
                </div>
                <div className="mt-4">
                  <p className="text-2xl tracking-tight leading-6 text-gray-600 ">
                    {wishlist.length} {wishlist.length > 1 ? "Items" :"Item" }
                  </p>
                </div>
                <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
                  {wishlist.map((w) => (
                    <>
                      <div className="flex flex-col">
                        <div className="w-full  p-6 flex flex-col">
                          <Link to={`/product/${w.slug}`}>
                            <img
                              className="hover:grow hover:shadow-lg h-48 w-52"
                              src={w.images?.[0].url}
                              alt=""
                            />
                            </Link>
                            <div className="pt-3 flex items-center justify-between">
                              <p className="">{w.title}</p>
                              <button onClick={()=>handleRemove(w._id)}> 

                              <HeartIcon className={`cursor-pointer h-6 w-6 ${wish ? "fill-red-600"  : "fill-current"} text-red-600`} />
                              </button>
                              
                            </div>
                            <p className="pt-1 text-gray-900">₹ {w.sellprice}</p>
                          
                        </div>
                      </div>
                      {/* <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                            <div className="w-full">
                              <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800  text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800  dark:bg-transparent dark:border-white dark:hover:bg-gray-800 bg-white border border-gray-800 dark:hover:text-white">
                                More information
                              </button>
                            </div>
                            <div className="w-full">
                              <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                                Add to cart
                              </button>
                            </div>
                          </div> */}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
