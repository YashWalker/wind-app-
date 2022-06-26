import React from "react";
import { Link } from "react-router-dom";

const OrderTable = ({ orders, handleStatusChange }) => {
  return (
    <>
      <div>
        <section className="container p-6 mx-auto">
          <h1 className="mb-4 text-xl md:text-2xl font-semibold text-black">
            Table information
          </h1>

          <div className="overflow-x-auto shadow-sm">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                  <th className="px-3 py-3" width="400">
                    Orders
                  </th>
                  <th className="px-3 py-3">Amount</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Date</th>
                  <th className="px-3 py-3 text-right" width="100">
                    Manage
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y">
                {orders.map((o) => (
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
                              src="images/avatars/avatar1.jpg"
                              alt=""
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
                      <td className="px-3 py-3">{o.paymentIntent?.TXNAMOUNT}</td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="px-3 py-3">{o.createdAt}</td>
                      <td className="px-3 py-3 flex justify-end gap-1">
                        <Link
                          className="px-2 py-1 inline-block text-red-500 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-red-600"
                          to="/"
                        >
                          <i className="fa fa-trash"></i>
                        </Link>
                        <Link
                          className="px-2 py-1 inline-block text-gray-500 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                          to="#"
                        >
                          <i className="fa fa-pen"></i>
                        </Link>
                        <Link
                          className="px-2 py-1 inline-block text-gray-500 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                          to="#"
                        >
                          <i className="fa fa-ellipsis-h"></i>
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
