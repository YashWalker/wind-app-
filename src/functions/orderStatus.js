import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

const OrderStatus = () => {
  const [values, setValues] = useState({
    success: false,
    error: false,
  });

  const { orderId } = useParams();
  useEffect(() => {
    getStatus();
  }, []);
  const { success, error } = values;

  const getStatus = () => {
    db.collection("payments")
      .doc("zX3ZBR7XBEz08m97tS3n")
      .get()
      .then((doc) => {
        if (doc) {
          doc.data().pay.map((data) => {
            if (data.ORDERID === orderId) {
              if (data.STATUS === "TXN_SUCCESS") {
                setValues({ ...values, success: true, error: false });
              }
            } else {
              setValues({ ...values, success: false, error: "Payment Failed" });
            }
          });
        }
      });
  };
  return (
    <>
      <div>
        {success && <h1>Payment Successfully</h1>}
        {error && <h1>{error}</h1>}
      </div>
    </>
  );
};

export default OrderStatus;
