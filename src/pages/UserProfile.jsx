import React, { useEffect, useState } from "react";
import UserSideBar from "../components/Navbar/UserSideBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeIcon } from "@heroicons/react/outline";
import { getUserOrders } from "../functions/user";
import OrderStatus from "../components/users/OrderStatus";

const UserProfile = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    getUserOrders(user.token).then((res) => {
      if (res.data) {
        setOrders(res.data);
        setLoading(false);
      } else {
        console.log("ERROR");
      }
    });
  };

  return (
    <>
      <div className="container flex">
        <div>
          <UserSideBar />
        </div>
        <div>
          <h2 className="text-center">User Profile</h2>
          <main className=" w-full px-4">
            <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
              <figure className="flex items-start sm:items-center">
                <img
                  className="w-16 rounded-full mr-4"
                  src={user.picture}
                  alt={user.id}
                />
                <figcaption>
                  <h5 className="font-semibold text-lg">
                    {user.name || "John Doe"}
                  </h5>
                  <p>
                    Email: <Link to={`mailto:${user.email}`}>{user.email}</Link>{" "}
                    | Phone: <Link to="tel:+91">{user.address.phone}</Link>
                  </p>
                </figcaption>
              </figure>

              <hr className="my-4" />

              <div className="sm:flex mb-5 gap-4">
                <figure className="md:w-1/2 flex items-center relative bg-gray-100 p-4 rounded-md">
                  <div className="mr-3">
                    <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow">
                      <HomeIcon className="w-8 h-8" />
                    </span>
                  </div>
                  <figcaption className="text-gray-600">
                    <p>
                      {" "}
                      {user.address.local}, <br />
                      {user.address.city}, {user.address.district},<br />
                      {user.address.stateName}, {user.address.pin}
                      <small className="text-gray-400 mx-2">(Primary)</small>
                    </p>
                  </figcaption>
                </figure>
                <figure className="md:w-1/2 flex items-center relative bg-gray-100 p-4 rounded-md">
                  <div className="mr-3">
                    <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow">
                      <i className="fa fa-map-marker-alt"></i>
                    </span>
                  </div>
                  <figcaption className="text-gray-600">
                    <p>
                      {" "}
                      Washington DC, Street name, <br /> Building 4343, Aprt 32{" "}
                    </p>
                  </figcaption>
                </figure>
              </div>
              <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
                <i className="mr-1 fa fa-plus"></i> Add new address
              </button>

              <hr className="my-4" />

              <h3 className="text-xl font-semibold mb-5">
                {orders.length > 0 ? "Current Orders" : "No Orders Yet"}
              </h3>
              <OrderStatus orders={orders}/>
            </article>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
