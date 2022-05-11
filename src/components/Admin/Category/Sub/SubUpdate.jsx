import React, { useState, useEffect } from "react";
import AdminBar from "../../../Navbar/AdminBar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../../functions/category";
import { updateSub, getSub } from "../../../../functions/sub";
import { Link } from "react-router-dom";

const SubUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
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
                  Update Sub-Category
                </h2>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1"> Categories </label>
                  <div className="relative">
                    <select
                      name="category"
                      onChange={(e) => setParent(e.target.value)}
                      className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    >
                      <option> Select Category </option>
                      {categories.length > 0 &&
                        categories.map((c) => (
                          <option
                            key={c._id}
                            value={c._id}
                            selected={c._id === parent}
                          >
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
                  <label className="block mb-1"> Name of Sub-Category </label>
                  <input
                    type="text"
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="Type here"
                    name="subs"
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
      </div>
    </div>
  );
};

export default SubUpdate;
