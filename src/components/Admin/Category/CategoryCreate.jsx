import React, { useState, useEffect } from "react";
import AdminBar from "../../Navbar/AdminBar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div className="container flex">
      <div>
        <AdminBar />
      </div>
      <div className="flex-1">
        <div>
          <section className="container max-w-3xl p-2 mx-auto">
            <article className="bg-white rounded shadow-sm border border-gray-200 p-4 lg:p-6 my-5">
              {loading ? (
                <h2 className="mb-3 text-xl md:text-2xl font-semibold text-gray-900">
                  Loading...
                </h2>
              ) : (
                <h2 className="mb-3 text-xl md:text-2xl font-semibold text-black">
                  Create category
                </h2>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1"> Name of Category </label>
                  <input
                    type="text"
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="Type here"
                    name="category"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <button
                  type="submit"
                  className="m-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  {" "}
                  Add Category{" "}
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
        <hr className="mb-3 border-t align-center w-10" />
        <div>
          <div className="container flex flex-col mx-auto w-full items-center justify-center  max-w-3xl p-2 ">
            <div className="px-4 py-5 sm:px-6 w-full border  bg-white shadow mb-2 rounded-md flex justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                  Categories
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 ">List</p>
              </div>
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
            <ul className="flex flex-col container max-w-3xl p-2 mx-auto">
              {categories.filter(searched(keyword)).map((c) => (
                <li className="border-gray-400 flex flex-row mb-2 ">
                  <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white rounded-md flex flex-1 items-center p-4">
                    <div className="flex-1 pl-1 md:mr-16">
                      <div className="font-medium " key={c.id}>
                        {c.name}
                      </div>
                    </div>
                    <Link
                      className="w-24 text-right flex justify-end"
                      to={`/admin/category/${c.slug}`}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </Link>

                    <button
                      className="w-24 text-right flex justify-end "
                      onClick={() => handleRemove(c.slug)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
