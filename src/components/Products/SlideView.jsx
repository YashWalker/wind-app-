import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductsByCount } from "../../functions/product";
import ProductCard from "./ProductCard";

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
          <div className="text-center w-screen  ">
            <h2 className="text-3xl text-gray-600">New Arrivals</h2>
          </div>
          <div className="w-screen">
            <div className="max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product.id}>
                    <div className="group relative" >
                      <div>
                        <ProductCard  product={product} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SlideView;
