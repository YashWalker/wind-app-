import React from "react";
import { Link } from "react-router-dom";

const OrderStatus = ({ orders }) => {
  return (
    <>
    {orders.map((o)=>(
      <>
      <article className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
        <header className="lg:flex justify-between mb-4">
          <div className="mb-4 lg:mb-0">
            <p className="font-semibold">
              <span>Order Id #{o.orderId} </span>
              <span className="text-green-500"> • Confirmed </span>
            </p>
            <p className="text-gray-500"> {o.paymentIntent.TXNDATE} </p>
          </div>
          <div>
            <button className="px-3 py-1 mx-2 inline-block text-sm text-red-500 border border-gray-300 rounded-md hover:text-red-500 hover:border-red-600">
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
              <li className="text-green-400">Transaction Id: #{o.paymentIntent.BANKTXNID} </li>
              <li>Shipping fee: Free</li>
              <li>Total paid: {o.paymentIntent.TXNAMOUNT}</li>
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
                <Link to="#" className="text-gray-600 hover:text-blue-600">
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
                <Link to="#" className="text-gray-600 hover:text-blue-600">
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
                <Link to="#" className="text-gray-600 hover:text-blue-600">
                  Travel Bag Jeans Blue Color Modern
                </Link>
              </p>
              <p className="mt-1 font-semibold">4x = $130.99</p>
            </figcaption>
          </figure>
        </div>
      </article>

      
      
      
      
      </>
    ))}
          </>
  );
};

export default OrderStatus;
