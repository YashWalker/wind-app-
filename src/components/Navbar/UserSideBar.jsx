import React from "react";
import { Link } from "react-router-dom";

const UserSideBar = () => {
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
                to="/user/profile/history"
              >
                <span className="mx-4 text-lg font-normal">Order History</span>
                <span className="flex-grow text-right"></span>
              </Link>
              <Link
                className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                to="/user/profile/wishlist"
              >
                <span className="mx-4 text-lg font-normal">Wishlist</span>
                <span className="flex-grow text-right"></span>
              </Link>
              <Link
                className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                to="/user/wishlist"
              >
                <span className="mx-4 text-lg font-normal">
                  Update Password
                </span>
                <span className="flex-grow text-right"></span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSideBar;
