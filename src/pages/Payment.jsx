import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails } from "../functions/order";
import {emptyUserCart} from "../functions/user";

const Payment = () => {
  const [order, setOrder] = useState([]);
  const [values, setValues] = useState({
    success: false,
    error: false,
  });

  const { user ,cart } = useSelector((state) => ({ ...state }));
  const { orderId } = useParams();
  const dispatch = useDispatch();
  
  const getOrderDetailsApi = async (orderId, token) => {
    try {
      const resp = await getOrderDetails(orderId, token);
      setOrder(resp.data);
      if (typeof window !== "undefined") localStorage.removeItem("cart");
      // empty cart from redux
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      // reset coupon to false
      dispatch({
        type: "COUPON_APPLIED",
        payload: false,
      });
      // empty cart from database
      emptyUserCart(user.token);
      console.log(order)
      
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    user?.token && getOrderDetailsApi(orderId, user.token);
  }, [user]);

  return (
    <>
    
 <div className="max-w-3xl mx-auto px-4 pt-16 pb-24 text-center">
 <div className="mb-8">
     <img src="" className="w-16 inline-block"/>
 </div>
 <h2 className="text-gray-800 font-medium text-3xl my-5">
     YOUR ORDER IS CONFIRMED!
     <p className="my-4">Order Id:#  </p>
 </h2>
 <p className="text-gray-600 ">
     Thank you for your order! Your order is being processed and will be completed within 3-6 hours. You will
     receive an email confirmation when your order is completed.
 </p>
 <div className="mt-10">
     <Link to="/" className="bg-primary border border-primary text-black px-6 py-3 font-medium rounded-md uppercase hover:bg-transparent
  hover:text-primary transition text-center">Continue shopping</Link>
 </div>
</div>

      
    </>
  );
};

export default Payment;