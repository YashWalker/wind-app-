import React, { useEffect, useState } from "react";
import { getProducts } from "../../functions/product";
import ProductCard from "./ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("sold", "desc").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  let slidesPerView = 5;
  let centeredSlides = true;
  let spaceBetween = 30;


  return (
    <>
     <section className="container">
        <div className="">
          <div className="text-center w-screen  ">
            <h2 className="text-3xl text-gray-600 mb-10">Best Sellers</h2>
          </div>
        </div>
        <div className="products-carousel">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={spaceBetween}
            loop={true}
            centeredSlides={centeredSlides}
            watchOverflow={true}
            slidesPerView={slidesPerView}
            className="swiper-wrapper"
          >
            {products.map((product) => (
              <SwiperSlide>
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default BestSellers;
