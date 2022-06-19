import React from "react";
import AdminBar from "../components/Navbar/AdminBar";

const AdminDashboard = () => {
  return (
    <>
      <div className="container flex">
        <div>
          <AdminBar />
        </div>
        <div>
          <h2 className="text-center">AdminDashboard</h2>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
