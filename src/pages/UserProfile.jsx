import React, { useEffect, useState } from "react";
import UserSideBar from "../components/Navbar/UserSideBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeIcon } from "@heroicons/react/outline";
import { getUserOrders } from "../functions/user";

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
              {loading && 
                
                  <>
                    <article
                      key={orders._id}
                      className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md"
                    >
                      <header className="lg:flex justify-between mb-4">
                        <div className="mb-4 lg:mb-0">
                          <p className="font-semibold">
                            <span>Order ID: {orders._id} </span>
                            <span className="text-green-500">
                              {" "}
                              • Confirmed{" "}
                            </span>
                          </p>
                          <p className="text-gray-500"> Dec 29, Mon, 2018 </p>
                        </div>
                        <div>
                          <button className="px-3 py-1 inline-block text-sm text-red-500 border border-gray-300 rounded-md hover:text-red-500 hover:border-red-600">
                            Cancel order
                          </button>
                          <button className="px-3 py-1 inline-block text-white text-sm bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700">
                            Track order
                          </button>
                        </div>
                      </header>
                      <div className="grid md:grid-cols-3 gap-2">
                        <div>
                          <p className="text-gray-400 mb-1">Person</p>
                          <ul className="text-gray-600">
                            <li>Mike Johnatan</li>
                            <li>Phone: 371-295-9131</li>
                            <li>Email: info@mywebsite.com</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1">Delivery address</p>
                          <ul className="text-gray-600">
                            <li>4715 Madisen Throughway</li>
                            <li>That street 053</li>
                            <li>Palo Alto, California</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-gray-400 mb-1">Payment</p>
                          <ul className="text-gray-600">
                            <li className="text-green-400">
                              Visa card **** 4216
                            </li>
                            <li>Shipping fee: $12.00</li>
                            <li>Total paid: $412.00</li>
                          </ul>
                        </div>
                      </div>

                      <hr className="my-4" />

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                        <figure className="flex flex-row mb-4">
                          <div>
                            <Link
                              to="#"
                              className="block w-20 h-20 rounded border border-gray-200 overflow-hidden"
                            >
                              <img src="images/items/10.jpg" alt="Title" />
                            </Link>
                          </div>
                          <figcaption className="ml-3">
                            <p>
                              <Link
                                to="#"
                                className="text-gray-600 hover:text-blue-600"
                              >
                                Travel Bag Jeans Blue Color Modern
                              </Link>
                            </p>
                            <p className="mt-1 font-semibold">2x = $330.00</p>
                          </figcaption>
                        </figure>

                        <figure className="flex flex-row mb-4">
                          <div>
                            <Link
                              to="#"
                              className="block w-20 h-20 rounded border border-gray-200 overflow-hidden"
                            >
                              <img src="images/items/11.jpg" alt="Title" />
                            </Link>
                          </div>
                          <figcaption className="ml-3">
                            <p>
                              <Link
                                to="#"
                                className="text-gray-600 hover:text-blue-600"
                              >
                                Travel Bag Jeans Blue Color Modern
                              </Link>
                            </p>
                            <p className="mt-1 font-semibold">1x = $120.90</p>
                          </figcaption>
                        </figure>

                        <figure className="flex flex-row mb-4">
                          <div>
                            <Link
                              to="#"
                              className="block w-20 h-20 rounded border border-gray-200 overflow-hidden"
                            >
                              <img src="images/items/12.jpg" alt="Title" />
                            </Link>
                          </div>
                          <figcaption className="ml-3">
                            <p>
                              <Link
                                to="#"
                                className="text-gray-600 hover:text-blue-600"
                              >
                                Travel Bag Jeans Blue Color Modern
                              </Link>
                            </p>
                            <p className="mt-1 font-semibold">4x = $130.99</p>
                          </figcaption>
                        </figure>
                      </div>
                    </article>
                  </>
                }
            </article>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
