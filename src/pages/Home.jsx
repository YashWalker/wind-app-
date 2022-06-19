import React from "react";
import Category from "../components/Products/Category";
import SlideView from "../components/Products/SlideView";
import Carousel from "../components/Products/Carousel";
import Footer from "../components/Navbar/Footer";
import FeatureProduct from "../components/Products/FeatureProduct";
const Home = () => {
  return (
    <>
      <Category />
      <FeatureProduct />
      <SlideView />
      <Carousel />
      <hr className="my-5" />
      <Footer />
    </>
  );
};

export default Home;
