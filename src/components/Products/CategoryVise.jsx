import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { useParams, Link } from "react-router-dom";
import Filters from "../Utils/Filters";

const CategoryVise = () => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <section className="py-12">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            {/* Filter Section */}
            <Filters />
            {/* Category vise */}
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <h2 className="text-center font-fonda text-xl p-2 m-2">
                {category.slug}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div key={p._id}>
                    <article className="shadow-sm rounded bg-white border border-gray-200">
                      <Link
                        to={`/product/${p.slug}`}
                        className="block relative p-1"
                      >
                        <img
                          src={p.images?.[0].url}
                          className="mx-auto w-auto"
                          height="240"
                          alt={p.title}
                        />
                      </Link>
                      <div className="p-4 border-t border-t-gray-200">
                        <p className="font-semibold">₹ {p.sellprice}</p>
                        <Link
                          to={`/product/${p.slug}`}
                          className="block text-gray-600 mb-3 hover:text-blue-500"
                        >
                          {p.title}
                        </Link>
                        <div>
                          <Link
                            className="px-4 py-2 inline-block text-white text-center bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                            to="#"
                          >
                            Add to cart
                          </Link>
                          <Link
                            className="px-3 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100"
                            to="#"
                          >
                            <i className="fa fa-heart"></i>
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryVise;
