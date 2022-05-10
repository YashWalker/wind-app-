import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Walnut", "Natural Teak", "Teak", "Natural", "Dark Walnut"],
  color: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);

  // destructure
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    color,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  const handleChange = (e) => {
    //
  };

  return (
    <>
      <section className="container max-w-3xl p-6 mx-auto">
        <article className="bg-white rounded shadow-sm border border-gray-200 p-4 lg:p-6 my-5">
          <h2 className="mb-3 text-xl md:text-2xl font-semibold text-black">
            Create New Product
          </h2>

          <form>
            <div className="mb-4">
              <label className="block mb-1"> Name of item </label>
              <input
                type="text"
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                placeholder="Type here"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1"> Description </label>
              <textarea
                rows="4"
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                placeholder="Type here"
                value={description}
                name="description"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block mb-1"> Image upload </label>
              <input type="file" className="w-72" placeholder="Type here" />
            </div>

            <div className="mb-4">
              <label className="block mb-1"> Tags input </label>
              <input
                type="text"
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                placeholder="Tag, Tag,..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-x-2">
              <div className="mb-4">
                <label className="block mb-1"> Category </label>
                <div className="relative">
                  <select className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full">
                    <option> Uncategorized </option>
                    <option> Automibiles </option>
                    <option> Clothings </option>
                    <option> Home items </option>
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
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1"> Subcategory </label>
                <div className="relative">
                  <select className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full">
                    <option> Select directory </option>
                    <option> Modern cars</option>
                    <option> Electric cars </option>
                    <option> Motorcycles</option>
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
                </div>
              </div>
            </div>
            {/* <!-- grid --> */}

            <div className="mb-4">
              <label className="block mb-1"> Price </label>
              <div className="grid grid-cols-3 gap-x-2 md:w-1/2">
                <div className="col-span-1">
                  <input
                    type="text"
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="0.00"
                    value={price}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2">
                  <select className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full">
                    <option>Colors :</option>
                    {colors.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* <!-- flex grid --> */}
            </div>

            <label className="flex items-center w-max my-4">
              <input checked name="" type="checkbox" className="h-4 w-4" />
              <span className="ml-2 inline-block text-gray-500">
                {" "}
                Publish item now{" "}
              </span>
            </label>

            <button
              type="submit"
              className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              {" "}
              Submit item{" "}
            </button>

            <Link
              to="#"
              className="px-4 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
            >
              {" "}
              Cancel{" "}
            </Link>
          </form>
        </article>
      </section>
    </>
  );
};

export default ProductCreate;
