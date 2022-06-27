import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ConfirmOrderPage from "../components/Utils/ConfirmOrderPage";
import { getOrderDetails } from "../functions/order";
import { emptyUserCart } from "../functions/user";

const Payment = () => {
  const [order, setOrder] = useState([]);
  const [values, setValues] = useState({
    success: false,
    error: false,
  });

  const { user, cart } = useSelector((state) => ({ ...state }));
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
      console.log(order);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    user?.token && getOrderDetailsApi(orderId, user.token);
  }, [user]);

  return (
    <div>
      <ConfirmOrderPage order={order} user={user}/>
    </div>
  );
};

export default Payment;
