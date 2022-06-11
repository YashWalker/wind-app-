import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart } from "../functions/user";
import { Link } from "react-router-dom";

const CheckOut = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 5));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {
    //
  };
  return (
    <>
      <section className="py-10 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
            <main className="md:w-2/3">
              {/* <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                    <div className="mb-4 lg:mb-0">
                      <h3 className="text-xl font-semibold">Have an account?</h3>
                      <p className="text-gray-600">
                        By creating account you will get more benefits
                      </p>
                    </div>
                    <div className="mx-2">
                      <Link
                        className="px-4 py-2 inline-block text-blue-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                        to="/login"
                      >
                        Sign in
                      </Link>

                      <Link
                        className="px-4 py-2 inline-block text-white bg-blue-600 shadow-sm border border-transparent rounded-md hover:bg-blue-700"
                        to="/signup"
                      >
                        Create account
                      </Link>
                    </div>
                  </div>
                </article> */}

              <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                <h2 className="text-xl font-semibold mb-5"> Checkout </h2>

                <div className="grid grid-cols-2 gap-x-3">
                  <div className="mb-4">
                    <label className="block mb-1"> First name </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Type here"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1"> Last name </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Type here"
                    />
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-x-3">
                  <div className="mb-4">
                    <label className="block mb-1"> Phone </label>
                    <div className="flex  w-full">
                      <input
                        className="appearance-none w-24 border border-gray-200 bg-gray-100 rounded-tl-md rounded-bl-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
                        type="text"
                        placeholder="Code"
                        value="+91"
                      />
                      <input
                        className="appearance-none flex-1 border border-gray-200 bg-gray-100 rounded-tr-md rounded-br-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
                        type="text"
                        placeholder="Type phone"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1"> Email </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="email"
                      placeholder="Type here"
                    />
                  </div>
                </div>

                <label className="flex items-center w-max my-4">
                  <input name="" type="checkbox" className="h-4 w-4" required />
                  <span className="ml-2 inline-block text-gray-500">
                    {" "}
                    I agree with Terms and Conditions{" "}
                  </span>
                </label>

                <hr className="my-4" />

                <h2 className="text-xl font-semibold mb-5">
                  Shipping information
                </h2>

                {/* <div className="grid sm:grid-cols-3 gap-3 mb-6">
                <label className="flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
                  <span>
                    <input
                      name="shipping"
                      type="radio"
                      className="h-4 w-4 mt-1"
                    />
                  </span>
                  <p className="ml-2">
                    <span>Express delivery</span>
                    <small className="block text-sm text-gray-400">
                      3-4 days via Fede
                    </small>
                  </p>
                </label>
                <label className="flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
                  <span>
                    <input
                      name="shipping"
                      type="radio"
                      className="h-4 w-4 mt-1"
                    />
                  </span>
                  <p className="ml-2">
                    <span>Post office</span>
                    <small className="block text-sm text-gray-400">
                      20-30 days via post
                    </small>
                  </p>
                </label>
                <label className="flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
                  <span>
                    <input
                      name="shipping"
                      type="radio"
                      className="h-4 w-4 mt-1"
                    />
                  </span>
                  <p className="ml-2">
                    <span>Self pick-up</span>
                    <small className="block text-sm text-gray-400">
                      Nearest location
                    </small>
                  </p>
                </label>
              </div> */}

                <div className="grid md:grid-cols-3 gap-x-3">
                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1"> Address* </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Type here"
                    />
                  </div>

                  <div className="mb-4 md:col-span-1">
                    <label className="block mb-1"> City* </label>
                    <div className="relative">
                      <select className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full">
                        <option>Jaipur</option>
                        <option>Pune</option>
                        <option>New Delhi</option>
                      </select>
                      <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
                        <svg
                          width="22"
                          height="22"
                          className="fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M7 10l5 5 5-5H7z"></path>
                        </svg>
                      </i>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-x-3">
                  <div className="mb-4 md:col-span-1">
                    <label className="block mb-1"> House </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Type here"
                    />
                  </div>

                  <div className="mb-4 md:col-span-1">
                    <label className="block mb-1"> Building </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Type here"
                    />
                  </div>

                  <div className="mb-4 md:col-span-1">
                    <label className="block mb-1"> ZIP code </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Type here"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block mb-1"> Other info </label>
                  <textarea
                    placeholder="Type your wishes"
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  ></textarea>
                </div>

                <label className="flex items-center w-max my-4">
                  <input name="" type="checkbox" className="h-4 w-4" />
                  <span className="ml-2 inline-block text-gray-500">
                    {" "}
                    Save my information for future purchase{" "}
                  </span>
                </label>

                <div className="flex justify-end space-x-2">
                  <Link
                    className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-bistre"
                    to="/"
                  >
                    {" "}
                    Back to Home{" "}
                  </Link>
                  <Link
                    className="px-5 py-2 inline-block text-white bg-amber-800 border border-transparent rounded-md hover:bg-amber-900"
                    to="*"
                  >
                    {" "}
                    Continue{" "}
                  </Link>
                </div>
              </article>
            </main>
            <aside className="md:w-1/3">
              <article className="text-gray-600" style={{ maxWidth: "350px" }}>
                <h2 className="text-lg font-semibold mb-3">Summary</h2>
                <ul>
                  <li className="flex justify-between mb-1">
                    <span>Base price:</span>
                    <span>₹ {total * (0.82).toFixed(1)}</span>
                  </li>
                  <li className="flex justify-between mb-1">
                    <span>Discount:</span>
                    <span className="text-green-500">- </span>
                  </li>
                  <li className="flex justify-between mb-1">
                    <span>GST:</span>
                    <span>₹ {total * (0.18).toFixed(2)}</span>
                  </li>
                  <li className="border-t flex justify-between mt-3 pt-3">
                    <span>Total price:</span>
                    <span className="text-gray-900 font-bold">₹{total}</span>
                  </li>
                </ul>

                <hr className="my-4" />

                <div className="flex gap-3">
                  <input
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    type="text"
                    placeholder="Coupon code"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                  >
                    {" "}
                    Apply{" "}
                  </button>
                </div>

                <hr className="my-4" />

                <h2 className="text-lg font-semibold mb-3">Items in cart</h2>

                {products.map((p, i) => (
                  <figure key={i} className="flex items-center mb-4 leading-5">
                    <div>
                      <div className="block relative w-20 h-20 rounded p-1 border border-gray-200">
                        <img
                          width="70"
                          height="70"
                          src={p.product.images?.[0].url}
                          alt={p.product.title}
                        />
                        <span className="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-green-600 rounded-full">
                          {p.count}
                        </span>
                      </div>
                    </div>
                    <figcaption className="ml-3">
                      <p>
                        {" "}
                        {p.product.title} <br /> {p.product.finish}
                      </p>
                      <p className="mt-1 text-gray-400">
                        {" "}
                        Price: ₹ {p.product.sellprice * p.count}{" "}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </article>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckOut;
