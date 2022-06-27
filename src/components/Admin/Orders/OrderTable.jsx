import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrashIcon,
  PencilIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

const OrderTable = ({ orders, handleStatusChange }) => {
  const [keyword, setKeyword] = useState("");

  const searched = (keyword) => (o) => o.orderId.includes(keyword);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };
  return (
    <>
      <div>
        <section className="container p-6 mx-auto">
          <div className="flex flex-row justify-between">
            <h1 className="mb-4 text-xl md:text-2xl font-semibold text-black ">
              Order Information
            </h1>
            <div>
              <input
                type="search"
                name="search"
                id=""
                placeholder="Filter"
                value={keyword}
                onChange={handleSearchChange}
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto shadow-sm">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                  <th className="px-3 py-3" width="400">
                    Orders
                  </th>
                  <th className="px-3 py-3">Amount</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Date & Time</th>
                  <th className="px-3 py-3 text-right" width="100">
                    Manage
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y">
                {orders.filter(searched(keyword)).map((o) => (
                  <>
                    <tr
                      className="text-gray-700 dark:text-gray-400"
                      key={o._id}
                    >
                      <td className="px-3 py-3">
                        <div className="flex items-center leading-tight">
                          <div className="mr-3 hidden md:block flex-shrink-0">
                            <img
                              width="36"
                              height="36"
                              className="object-cover w-10 h-10 rounded-full"
                              src={o.products.product?.images[0].url}
                              alt={o.products.count}
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{o.orderedBy}</p>
                            <p className="text-sm text-gray-500">
                              Order Id :#{o.orderId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        {" "}
                        ₹ {o.paymentIntent?.TXNAMOUNT}
                      </td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-lg">
                          <select
                            name="shipping"
                            onChange={(e) =>
                              handleStatusChange(`${o.orderId}`, e.target.value)
                            }
                            className="bg-green-100"
                            defaultValue={o.orderStatus}
                          >
                            <option value="Not Processed">
                              Not Processed
                            </option>
                            <option value="processing"> Processing </option>
                            <option value="Dispatched"> Dispatched </option>
                            <option value="Cancelled"> Cancelled </option>
                            <option value="Completed"> Completed </option>
                          </select>
                          <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
                            <svg
                              width="22"
                              height="22"
                              className="fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M7 10l5 5 5-5H7z"></path>
                            </svg>
                          </i>
                        </span>
                      </td>
                      <td className="px-3 py-3">{o.createdAt.split("T")[0]}</td>
                      <td className="px-3 py-3 flex justify-end gap-1">
                        <Link
                          className="px-2 py-1 inline-block text-red-500 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-red-600"
                          to="/"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </Link>
                        <Link
                          className="px-2 py-1 inline-block text-gray-500 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                          to="#"
                        >
                          <PencilIcon className="h-5 2-5" />
                        </Link>
                        <Link
                          className="px-2 py-1 inline-block text-gray-500 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                          to="#"
                        >
                          <DotsHorizontalIcon className="h-5 w-5" />
                        </Link>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default OrderTable;
