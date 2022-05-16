import React, { useState, useEffect } from "react";
import AdminBar from "../../Navbar/AdminBar";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    // let answer = window.confirm("Delete?");
    if (window.confirm("Delete?")) {
      // console.log("send delete request", slug);
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.res.status === 400) toast.error(err.res.data);
          console.log(err);
        });
    }
  };

  const searched = (keyword) => (s) => s.title.toLowerCase().includes(keyword);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="container flex">
        <div>
          <AdminBar />
        </div>
        <div className="flex-1">
          <div className="container mx-auto px-4 sm:px-8 ">
            <div className="py-4">
              <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                <h2 className="text-2xl leading-tight">Product List</h2>
                <div className="text-end">
                  <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                    <div className=" relative ">
                      <input
                        type="search"
                        name="search"
                        value={keyword}
                        onChange={handleSearchChange}
                        id=""
                        className=" appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
                        placeholder="filter"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                        >
                          Sell Price
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                        >
                          Created At
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                        >
                          status
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                        >
                          Edit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.filter(searched(keyword)).map((s) => (
                        <tr key={s._id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <Link to="*" className="block relative">
                                  <img
                                    alt={s.title}
                                    src={
                                      s.images && s.images.length
                                        ? s.images[0].url
                                        : "WK"
                                    }
                                    className="mx-auto object-cover rounded-full h-10 w-10 "
                                  />
                                </Link>
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {s.title}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {s.category.name}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {s.price}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {s.sellprice}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {s.quantity}
                            </p>
                          </td>

                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {s.createdAt.split("T")[0]}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">active</span>
                            </span>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span to="/*" className="inline-flex  ">
                              <Link to={`/admin/products/${s.slug}`}>
                                <PencilIcon className="w-4 h-4 mx-1 hover:scale-110 hover:stroke-orangepeel" />
                              </Link>
                              <TrashIcon
                                onClick={() => handleRemove(s.slug)}
                                className="w-4 h-4 mx-1 hover:scale-110 hover:stroke-orangepeel"
                              />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination Buttons */}
                  <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
                      >
                        <svg
                          width="9"
                          fill="currentColor"
                          height="8"
                          className=""
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 "
                      >
                        1
                      </button>
                      <button
                        type="button"
                        className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                      >
                        2
                      </button>
                      <button
                        type="button"
                        className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100"
                      >
                        3
                      </button>
                      <button
                        type="button"
                        className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                      >
                        4
                      </button>
                      <button
                        type="button"
                        className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
                      >
                        <svg
                          width="9"
                          fill="currentColor"
                          height="8"
                          className=""
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
