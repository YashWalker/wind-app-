import React, { useEffect, useState } from "react";
import UserSideBar from "../Navbar/UserSideBar";
import { useSelector } from "react-redux";
import { getUserOrders } from "../../functions/user";
import OrderStatus from "../users/OrderStatus";

const OrderHistory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    getUserOrders(user.token).then((res) => {
      if (res.data) {
        setOrders(res.data);
        console.log(res.data)
        setLoading(false);
      } else {
        console.log("ERROR");
      }
    });
  };
  return (
    <>
      <div className="flex">
        <div>
          <UserSideBar />
        </div>
        <div>
          <h2 className="text-center justify-center ">OrderHistory</h2>
          <div className="mx-10 my-5"><OrderStatus orders={orders}/></div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
