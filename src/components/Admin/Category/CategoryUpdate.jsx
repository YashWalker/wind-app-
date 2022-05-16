import React, { useState, useEffect } from "react";
import AdminBar from "../../Navbar/AdminBar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import { Link, useNavigate, useParams } from "react-router-dom";

const CategoryUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  let params = useParams();

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateCategory(params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        navigate("/admin/category");
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
                  Update category
                </h2>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1"> Name of Category </label>
                  <input
                    type="text"
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="Type here"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <button
                  type="submit"
                  className="m-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  {" "}
                  Update Category{" "}
                </button>

                <Link
                  to="/product/category"
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

export default CategoryUpdate;
