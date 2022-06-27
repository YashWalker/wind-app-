import React from "react";
import Category from "../components/Products/Category";
import SlideView from "../components/Products/SlideView";

import Footer from "../components/Navbar/Footer";
import FeatureProduct from "../components/Products/FeatureProduct";
const Home = () => {
  return (
    <>
      <Category />
      <FeatureProduct />
      <SlideView />
     
      <hr className="my-20" />
      <Footer />
    </>
  );
};

export default Home;
