import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductsByCount } from "../../functions/product";

const SlideView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);

        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl text-gray-600">New Arrivals</h2>
          </div>
          <div>
            <div className="bg-white">
              <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {products.map((p) => (
                    <div key={p.id} className="group relative">
                      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                        <img
                          src={p.images[0].url}
                          alt={p.name}
                          className=" object-center object-cover lg:w-full lg:h-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <Link to={`/product/${p.slug}`}>
                              <span className="absolute inset-0" />
                              {p.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {p.finish}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {p.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SlideView;
