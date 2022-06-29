import React from "react";
import Category from "../components/Products/Category";
import SlideView from "../components/Products/SlideView";

import Footer from "../components/Navbar/Footer";
import FeatureProduct from "../components/Products/FeatureProduct";
import BestSellers from "../components/Products/BestSellers";
const Home = () => {
  return (
    <>
      <Category />
      <FeatureProduct />
      <BestSellers/>
      <SlideView />
     
      <hr className="my-20" />
      <Footer />
    </>
  );
};

export default Home;
