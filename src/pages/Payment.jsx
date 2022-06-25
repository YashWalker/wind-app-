import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../functions/order";

const Payment = () => {
  const [values, setValues] = useState({
    success: false,
    error: false,
  });

  const { user } = useSelector((state) => ({ ...state }));
  const { orderId } = useParams();
  //const paytm = collection(db , "payments" ,'zX3ZBR7XBEz08m97tS3n' );

  useEffect(() => {
    user?.token && getOrderDetails(orderId, user.token);
  }, [user]);

  return (
    <>
      <h2>Order Status{orderId}</h2>
      <div></div>
    </>
  );
};

export default Payment;
