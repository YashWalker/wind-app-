import axios from "axios";

export const createPaymentIntent = ({ oid, total, email }, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    { oid, total, email },

    {
      headers: {
        authtoken,
      },
    }
  );
