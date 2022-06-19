import React from "react";
import { Link } from "react-router-dom";

const Filters = () => {
  return (
    <>
      <aside className="md:w-1/3 lg:w-1/4 px-4">
        <a
          className="md:hidden mb-5  w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
          href="#"
        >
          Filter by
        </a>

        <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
          <h3 className="font-semibold mb-2">Category</h3>

          <ul className="text-gray-500 space-y-1">
            <li>
              <a className="hover:text-blue-600 hover:underline" href="#">
                Electronics{" "}
              </a>
            </li>
            <li>
              <a className="hover:text-blue-600 hover:underline" href="#">
                Watches{" "}
              </a>
            </li>
            <li>
              <a className="hover:text-blue-600 hover:underline" href="#">
                Cinema{" "}
              </a>
            </li>
            <li>
              <a className="hover:text-blue-600 hover:underline" href="#">
                Clothes{" "}
              </a>
            </li>
            <li>
              <a className="hover:text-blue-600 hover:underline" href="#">
                Home items{" "}
              </a>
            </li>
            <li>
              <a className="hover:text-blue-600 hover:underline" href="#">
                Smartwatches{" "}
              </a>
            </li>
          </ul>

          <hr className="my-4" />

          <h3 className="font-semibold mb-2">Filter by</h3>
          <ul className="space-y-1">
            <li>
              <label className="flex items-center">
                <input name="" type="checkbox" checked="" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Samsung </span>
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input name="" type="checkbox" checked="" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Huawei </span>
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input name="" type="checkbox" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Tesla model </span>
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input name="" type="checkbox" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Best brand </span>
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input name="" type="checkbox" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Other brands </span>
              </label>
            </li>
          </ul>

          <hr className="my-4" />

          <h3 className="font-semibold mb-2">Sort by</h3>
          <ul className="space-y-1">
            <li>
              <label className="flex items-center">
                <input
                  name="myselection"
                  type="radio"
                  checked=""
                  className="h-4 w-4"
                />
                <span className="ml-2 text-gray-500"> Lightblue </span>
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input name="myselection" type="radio" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Orange </span>
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input name="myselection" type="radio" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Silver </span>
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input name="myselection" type="radio" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Darkblue </span>
              </label>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Filters;
