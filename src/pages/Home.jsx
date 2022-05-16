import React from "react";
import Category from "../components/Products/Category";
import SlideView from "../components/Products/SlideView";
import Carousel from "../components/Products/Carousel";
import NewArrivals from "../components/NewArrivals";

const Home = () => {
  return (
    <>
      <Category />
      <SlideView />
      <Carousel />
      <NewArrivals />
    </>
  );
};

export default Home;
