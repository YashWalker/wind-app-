import React, { useState, useEffect } from "react";
import AdminBar from "../../Navbar/AdminBar";
import { useSelector } from "react-redux";
import { getOrders , changeState} from "../../../functions/admin";
import {toast} from "react-toastify";
import OrderTable from "./OrderTable";

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);
  const loadOrders = () => {
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  };


  const handleStatusChange=async (orderId , orderStatus)=>{
    changeState(orderId , orderStatus , user.token).then((res)=>{
        toast.success("Status Updated");
        loadOrders();
    })
  }
  return (
    <>
      <div className="container flex">
        <div>
          <AdminBar />
        </div>
        <div className="flex-1">
      <OrderTable orders={orders} handleStatusChange={handleStatusChange}/>
        </div>
      </div>
    </>
  );
};

export default OrderStatus;
