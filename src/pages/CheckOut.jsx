import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  applyCoupon,
  saveUserAddress,
} from "../functions/user";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Pincode from "react-pincode";
import { HomeIcon, UserIcon } from "@heroicons/react/outline";
import { createPaymentIntent } from "../functions/paytm";
import { Helmet } from "react-helmet";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  local: "",
  city: "",
  district: "",
  stateName: "",
  pin: "",
};

const CheckOut = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [pincodeData, setPincodeData] = useState("");
  const [address, setAddress] = useState(initialState);
  const [addressSaved, setAddressSaved] = useState(false);
  const [data, setData] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  const {
    firstName,
    lastName,
    email,
    phone,
    local,
    city,
    district,
    stateName,
    pin,
  } = address;

  // useEffect(() => {
  //   getUserCart(user.token).then((res) => {
  //     console.log("user cart res", JSON.stringify(res.data, null, 5));
  //     setProducts(res.data.products);
  //     setTotal(res.data.cartTotal);
  //   });
  // }, []);

  useEffect(() => {
    if (user && user.token) {
      getUserCart(user.token).then((res) => {
        console.log("user cart res", JSON.stringify(res.data, null, 4));
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      });
    }
  }, [user]);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon)
      .then((res) => {
        console.log("RES ON COUPON APPLIED", res.data);
        if (res.data) {
          setTotalAfterDiscount(res.data);
          toast.success(`Coupon ${res.data.name} applied`);
          // update redux coupon applied true/false
          dispatch({
            type: "COUPON_APPLIED",
            payload: true,
          });
        }
        // error
        // else  {
        //   setDiscountError("Invalid Coupon");
        //   // update redux coupon applied true/false
        //   dispatch({
        //     type: "COUPON_APPLIED",
        //     payload: false,
        //   });
        // }
      })
      .catch((err) => {
        setDiscountError("Invalid Coupon");
        toast.error(err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      });
  };

  const addAddress = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    console.log(address);
  };

  const saveAddressToDb = () => {
    //
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const payPaytm = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    let email = user.email;
    setCheckoutLoading(true);
    createPaymentIntent({ oid, total, email }, user.token)
      .then((res) => {
        if (res.data) {
          const { data } = res;
          console.log("Token", data.txnToken);
          var config = {
            root: "",
            flow: "DEFAULT",
            data: {
              orderId: oid /* update order id */,
              token: data.txnToken /* update token value */,
              tokenType: "TXN_TOKEN",
              amount: total /* update amount */,
            },
            handler: {
              notifyMerchant: function (eventName, data) {
                console.log("notifyMerchant handler function called");
                console.log("eventName => ", eventName);
                console.log("data => ", data);
              },
            },
          };

          if (window.Paytm && window.Paytm.CheckoutJS) {
            window.Paytm.CheckoutJS.init(config)
              .then(function onSuccess() {
                window.Paytm.CheckoutJS.invoke();
                setCheckoutLoading(false);
              })
              .catch(function onError(error) {
                console.log("Error => ", error);
                setCheckoutLoading(false);
              });
          }
          // setting data here
          // data from setData will not contain because setData is async operation

          setData(data);
        }
      })
      .catch((e) => {
        setCheckoutLoading(false);
      });
  };

  return (
    <>
      {checkoutLoading && (
        <div class="fixed bg-black bg-opacity-50 top-0 justify-center items-center h-full flex right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
          <img
            src={`/Assets/images/Loading.svg`}
            alt="Loading"
            className="w-16 h-16"
          />
        </div>
      )}
      <section className="py-10 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
            {user && user.address ? (
              <main className="md:w-2/3">
                <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                  <h2 className="text-xl font-semibold mb-5">
                    {" "}
                    Saved Address{" "}
                  </h2>

                  <figure className="flex items-start sm:items-center">
                    <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow">
                      <UserIcon className="w-8 h-8" />
                    </span>
                    <figcaption className="mx-2">
                      <h5 className="font-semibold text-lg">
                        {user.address.firstName + user.address.lastName}
                      </h5>
                      <p>
                        Email:{" "}
                        <Link to={`mailto:${user.email}`}>
                          {user.address.email}
                        </Link>{" "}
                        | Phone:{" "}
                        <Link to="tel:+91">+91-{user.address.phone}</Link>
                      </p>
                    </figcaption>
                  </figure>

                  <hr className="my-4" />

                  <div className="sm:flex mb-5 gap-4">
                    <figure className="md:w-1/2 flex items-center relative bg-gray-100 p-4 rounded-md">
                      <div className="mr-3">
                        <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow">
                          <HomeIcon className="w-8 h-8" />
                        </span>
                      </div>
                      <figcaption className="text-gray-600">
                        <p>
                          {" "}
                          {user.address.local}, <br />
                          {user.address.city}, {user.address.district},<br />
                          {user.address.stateName}, {user.address.pin}
                          <small className="text-gray-400 mx-2">
                            (Primary)
                          </small>
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-end space-x-2">
                    <Link
                      className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-bistre"
                      to="/"
                    >
                      {" "}
                      Back to Home{" "}
                    </Link>
                    <button
                      onClick={payPaytm}
                      className="px-5 py-2 inline-block text-white bg-amber-800 border border-transparent rounded-md hover:bg-amber-900"
                    >
                      {" "}
                      Place Order{" "}
                    </button>
                  </div>
                </article>
              </main>
            ) : (
              <main className="md:w-2/3">
                {addressSaved ? (
                  <>
                    {" "}
                    <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                      <h2 className="text-xl font-semibold mb-5">
                        {" "}
                        Saved Address{" "}
                      </h2>

                      <figure className="flex items-start sm:items-center">
                        <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow">
                          <UserIcon className="w-8 h-8" />
                        </span>
                        <figcaption className="mx-2">
                          <h5 className="font-semibold text-lg">
                            {address.firstName + address.lastName}
                          </h5>
                          <p>
                            Email:{" "}
                            <Link to={`mailto:${user.email}`}>
                              {address.email}
                            </Link>{" "}
                            | Phone:{" "}
                            <Link to="tel:+91">+91-{address.phone}</Link>
                          </p>
                        </figcaption>
                      </figure>

                      <hr className="my-4" />

                      <div className="sm:flex mb-5 gap-4">
                        <figure className="md:w-1/2 flex items-center relative bg-gray-100 p-4 rounded-md">
                          <div className="mr-3">
                            <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow">
                              <HomeIcon className="w-8 h-8" />
                            </span>
                          </div>
                          <figcaption className="text-gray-600">
                            <p>
                              {" "}
                              {address.local}, <br />
                              {address.city}, {address.district},<br />
                              {address.stateName}, {address.pin}
                              <small className="text-gray-400 mx-2">
                                (Primary)
                              </small>
                            </p>
                          </figcaption>
                        </figure>
                      </div>
                      <hr className="my-4" />
                      <div className="flex justify-end space-x-2">
                        <Link
                          className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-bistre"
                          to="/"
                        >
                          {" "}
                          Back to Home{" "}
                        </Link>
                        <button
                          onClick={payPaytm}
                          className="px-5 py-2 inline-block text-white bg-amber-800 border border-transparent rounded-md hover:bg-amber-900"
                        >
                          {" "}
                          Place Order{" "}
                        </button>
                      </div>
                    </article>
                  </>
                ) : (
                  <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                    <h2 className="text-xl font-semibold mb-5"> Checkout </h2>

                    <div className="grid grid-cols-2 gap-x-3">
                      <div className="mb-4">
                        <label className="block mb-1"> First name </label>
                        <input
                          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          type="text"
                          placeholder="Type here"
                          onChange={addAddress}
                          name="firstName"
                          value={firstName}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block mb-1"> Last name </label>
                        <input
                          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          type="text"
                          placeholder="Type here"
                          onChange={addAddress}
                          name="lastName"
                          value={lastName}
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
                            onChange={addAddress}
                            name="phone"
                            value={phone}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block mb-1"> Email </label>
                        <input
                          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          type="email"
                          placeholder="Type here"
                          onChange={addAddress}
                          name="email"
                          value={email}
                        />
                      </div>
                    </div>

                    <label className="flex items-center w-max my-4">
                      <input
                        name=""
                        type="checkbox"
                        className="h-4 w-4"
                        required
                      />
                      <span className="ml-2 inline-block text-gray-500">
                        {" "}
                        I agree with Terms and Conditions{" "}
                      </span>
                    </label>

                    <hr className="my-4" />

                    <h2 className="text-xl font-semibold mb-5">
                      Shipping information
                    </h2>

                    <div className="grid md:grid-cols-3 gap-x-3">
                      <div className="mb-4 md:col-span-2">
                        <label className="block mb-1">
                          {" "}
                          Address* (House / Building / Locality)
                        </label>
                        <input
                          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          type="text"
                          placeholder="Type here"
                          onChange={addAddress}
                          name="local"
                          value={local}
                        />
                      </div>

                      <div className="mb-4 md:col-span-1">
                        <label className="block mb-1"> City* </label>
                        <input
                          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          type="text"
                          placeholder="City"
                          value={city}
                          onInput={addAddress}
                          name="city"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-x-3">
                      <div className="mb-4 md:col-span-1">
                        <label className="block mb-1"> District </label>
                        <input
                          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          type="text"
                          placeholder="District"
                          value={district}
                          onInput={addAddress}
                          name="district"
                        />
                      </div>

                      <div className="mb-4 md:col-span-1">
                        <label className="block mb-1"> State </label>
                        <input
                          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          type="text"
                          placeholder="State"
                          value={stateName}
                          onChange={addAddress}
                          name="stateName"
                        />
                      </div>

                      <div className="mb-4 md:col-span-1">
                        <label className="block mb-1"> PIN Code </label>
                        <input
                          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          type="text"
                          placeholder="Pin Code"
                          name="pin"
                          onChange={addAddress}
                          value={pin}
                        />
                        {/* <Pincode
                      invalidError="Please check pincode"
                      lengthError="check length"
                      getData={(data) => setPincodeData(data)}
                      showArea={false}
                      showState={false}
                      showDistrict={false}
                      showCity={false}
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      pincodeInput={{
                        borderRadius: ".375rem",
                        padding: ".5rem .75rem .5rem .75rem",
                        backgroundColor: "rgb(243 244 246)",
                        border: "rgb(229 231 235)",
                        width: "100%",
                      }}
                      onInputCapture={addAddress}
                      name="pin"
                    /> */}
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
                      <button
                        className="px-5 py-2 inline-block text-white bg-amber-800 border border-transparent rounded-md hover:bg-amber-900"
                        onClick={saveAddressToDb}
                      >
                        {" "}
                        Save Address{" "}
                      </button>
                    </div>
                  </article>
                )}
              </main>
            )}
            <aside className="md:w-1/3">
              <article className="text-gray-600" style={{ maxWidth: "350px" }}>
                <h2 className="text-lg font-semibold mb-3">Summary</h2>
                <ul>
                  <li className="flex justify-between mb-1">
                    <span>Base price:</span>
                    <span>₹ {total * (0.82).toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between mb-1">
                    <span>GST:</span>
                    <span>₹ {total * (0.18).toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between mb-1">
                    <span>Discount:</span>
                    <span className="text-green-500">
                      {" "}
                      -{" "}
                      {!totalAfterDiscount
                        ? "0"
                        : `${total - totalAfterDiscount}`}{" "}
                    </span>
                    {discountError ? (
                      <span className="p-2">Invalid Coupon</span>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="border-t flex justify-between mt-3 pt-3">
                    <span>Total price:</span>
                    <span className="text-gray-900 font-bold">
                      ₹{" "}
                      {!totalAfterDiscount
                        ? `${total}`
                        : `${totalAfterDiscount}`}
                    </span>
                  </li>
                </ul>

                <hr className="my-4" />

                <div className="flex gap-3">
                  <input
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    type="text"
                    placeholder="Coupon code"
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      setDiscountError("");
                    }}
                    value={coupon}
                  />
                  <button
                    type="button"
                    onClick={applyDiscountCoupon}
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
                <hr className="my-4" />

                <button
                  className=" px-5 py-2 inline-block text-white bg-amber-800 border border-transparent rounded-md hover:bg-amber-900 "
                  onClick={emptyCart}
                >
                  Empty Cart
                </button>
              </article>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckOut;
