import React from "react";
import { Link } from "react-router-dom";

const AdminBar = () => {
  return (
    <>
      <div className="relative bg-slate-100 ">
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="w-72 h-screen">
            <nav className="mt-10 px-6 ">
              <Link
                className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                to="#"
              >
                <span className="mx-4 text-lg font-normal">DashBoard</span>
                <span className="flex-grow text-right"></span>
              </Link>
              <Link
                className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                to="/admin/category"
              >
                <span className="mx-4 text-lg font-normal">Category</span>
                <span className="flex-grow text-right"></span>
              </Link>
              <Link
                className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                to="/admin/sub"
              >
                <span className="mx-4 text-lg font-normal">Sub Category</span>
                <span className="flex-grow text-right"></span>
              </Link>
              <Link
                className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                to="/admin/product"
              >
                <span className="mx-4 text-lg font-normal">Products</span>
                <span className="flex-grow text-right"></span>
              </Link>
              <Link
                className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                to="/admin/products"
              >
                <span className="mx-4 text-lg font-normal">Products List</span>
                <span className="flex-grow text-right"></span>
              </Link>
              <Link
                className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                to="/user/profile/wishlist"
              >
                <span className="mx-4 text-lg font-normal">Orders</span>
                <span className="flex-grow text-right"></span>
              </Link>
              <Link
                className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                to="/user/profile/wishlist"
              >
                <span className="mx-4 text-lg font-normal">Customer</span>
                <span className="flex-grow text-right"></span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBar;
