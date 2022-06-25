import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../functions/order";

const Payment = () => {
  const [data, setData] = useState(null);
  const [values, setValues] = useState({
    success: false,
    error: false,
  });

  const { user } = useSelector((state) => ({ ...state }));
  const { orderId } = useParams();
  //const paytm = collection(db , "payments" ,'zX3ZBR7XBEz08m97tS3n' );
  const getOrderDetailsApi = async (orderId, token) => {
    try {
      const resp = await getOrderDetails(orderId, token);
      setData(resp.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    user?.token && getOrderDetailsApi(orderId, user.token);
  }, [user]);

  return (
    <>
      <h2>Order Status{orderId}</h2>
      <div></div>
    </>
  );
};

export default Payment;
