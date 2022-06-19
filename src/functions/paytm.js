import axios from "axios";

export const createPaymentIntent = ({oid , coupon , email }, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    {oid , coupon , email},
    {
      headers: {
        authtoken,
      },
    }
  );
