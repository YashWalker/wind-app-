import axios from "axios";

<<<<<<< HEAD
export const createPaymentIntent = ({oid , coupon , email }, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    {oid , coupon , email},
=======
export const createPaymentIntent = ({oid , total , email }, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    {oid , total , email},
>>>>>>> f885e6344d3eac8d030c10843d4bdbbbd78a88e0
    {
      headers: {
        authtoken,
      },
    }
  );
