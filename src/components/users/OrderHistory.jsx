import React from "react";
import UserSideBar from "../Navbar/UserSideBar";

const OrderHistory = () => {
  return (
    <>
      <div className="flex">
        <div>
          <UserSideBar />
        </div>
        <div>
          <h2 className="text-center justify-center ">OrderHistory</h2>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
