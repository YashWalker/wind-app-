import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import AdminBar from "../../Navbar/AdminBar";
import { getCategories, getCategorySubs } from "../../../functions/category";

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
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

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

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 400) toast.error(err.response.data);
      });
    setShowSub(true);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <>
      <div className="container flex">
        <div>
          <AdminBar />
        </div>
        <div className="flex-1">
          <div>
            <section className="container max-w-3xl p-6 mx-auto">
              <article className="bg-white rounded shadow-sm border border-gray-200 p-4 lg:p-6 my-5">
                <h2 className="mb-3 text-xl md:text-2xl font-semibold text-black">
                  Create New Product
                </h2>

                <form onSubmit={handleSubmit}>
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
                    <input
                      type="file"
                      className="w-72"
                      placeholder="Type here"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-2">
                    <div className="mb-4">
                      <label className="block mb-1"> Color </label>
                      <div className="relative">
                        <select
                          name="color"
                          onChange={handleChange}
                          className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        >
                          <option> Select Color </option>
                          {colors.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
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
                      <label className="block mb-1"> Shipping </label>
                      <div className="relative">
                        <select
                          name="shipping"
                          onChange={handleChange}
                          className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        >
                          <option> Select </option>
                          <option value="No"> No </option>
                          <option value="Yes"> Yes </option>
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

                  <div className="grid md:grid-cols-2 gap-x-2">
                    <div className="mb-4">
                      <label className="block mb-1"> Category </label>
                      <div className="relative">
                        <select
                          name="category"
                          onChange={handleCategoryChange}
                          className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        >
                          <option> Select Category </option>
                          {categories.length > 0 &&
                            categories.map((c) => (
                              <option key={c._id} value={c._id}>
                                {c.name}
                              </option>
                            ))}
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
                      <label className="block mb-1"> Sub-Category </label>
                      <div className="relative">
                        <select
                          name="subs"
                          onChange={handleChange}
                          className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        >
                          <option> Select </option>
                          {subOptions.length > 0 &&
                            subOptions.map((c) => (
                              <option key={c._id} value={c._id}>
                                {c.name}
                              </option>
                            ))}
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

                  <div className="grid md:grid-cols-2 gap-x-2">
                    <div className="mb-4">
                      <label className="block mb-1"> Price (₹) </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="price"
                          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          placeholder="₹ "
                          value={price}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1"> Quantity </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="quantity"
                          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          placeholder="Quantity "
                          value={quantity}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- grid --> */}

                  <label className="flex items-center w-max my-4">
                    <input name="" type="checkbox" className="h-4 w-4" />
                    <span className="ml-2 inline-block text-gray-500">
                      {" "}
                      Publish item now{" "}
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="m-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    {" "}
                    Add item{" "}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
