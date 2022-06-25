import axios from "axios";

export const getOrderDetails = async (id, authtoken) =>
  await axios.get(
    `${process.env.REACT_APP_API}/order/details/${id}`,
    {
      headers: {
        authtoken,
      },
    }
  );




