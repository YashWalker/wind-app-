import React from "react";

const FeatureProduct = () => {
  return (
    <>
      <section className="container mx-auto  p-5 px-0 md:p-5 md:py-16 md:px-0">
        <section className="p-5 md:p-0 xl:grid xl:grid-cols-12 xl:grid-rows-6 xl:h-200">
          <section className="row-start-1 row-end-5 col-start-1 col-end-9 bg-orange-100">
            <article className="p-10 flex justify-between items-center h-full">
              <div className="space-y-5">
                <h2 className="text-3xl md:text-5xl max-w-md">
                  Comfortable Cusion Chair
                </h2>
                <h3 className="text-xl">₹ 6400</h3>
                <button className="p-2 px-6 bg-amber-800 text-white rounded-md hover:bg-amber-900">
                  Add To Cart
                </button>
              </div>
              <div>
                <img
                  className="h-auto w-96"
                  src="https://www.dropbox.com/s/8ymeus1n9k9bhpd/y16625.png?dl=1"
                  alt=""
                />
              </div>
            </article> 
          </section>
          <section className="row-start-5 row-end-7 col-start-1 col-end-4 bg-purple-300">
            <article className="flex items-center h-full bg-green-900  p-6">
              <div>
                <h2 className="uppercase text-xm font-semibold text-gray-300">
                  Featured
                </h2>
                <p className=" text-3xl font-xl text-white mt-2">
                  Woodkoof by Chitra Furniture
                </p>
              </div>
            </article>
          </section>
          <section className="row-start-5 row-end-7 col-start-4 col-end-9 bg-gray-200">
            <article className="p-10 flex justify-between items-center h-full">
              <div className="space-y-5">
                <h2 className="text-3xl max-w-xs">Multipurpose Wooden Tool</h2>
                <h3 className="text-xl">$24</h3>
                <button className="p-2 px-6 bg-amber-900 text-white rounded-md hover:bg-amber-900">
                  Add To Cart
                </button>
              </div>
              <div>
                <img
                  className="h-auto w-full ml-10 -mt-5"
                  src="https://www.dropbox.com/s/1fav310i2eqkdz8/tool2.png?dl=1"
                  alt=""
                />
              </div>
            </article>
          </section>
          <section className="row-start-1 row-end-4 col-start-9 col-end-13 bg-teal-100">
            <article className="p-10 flex justify-between items-center h-full">
              <div className="space-y-5">
                <h2 className="text-2xl max-w-sm ">Comfortable Wooden Chair</h2>
                <h3 className="text-xl">₹ 7900</h3>
                <button className="p-2 px-6 bg-amber-900 text-white rounded-md hover:bg-amber-900">
                  Add To Cart
                </button>
              </div>
              <div>
                <img
                  className="h-auto w-80"
                  src="https://www.dropbox.com/s/mlor33hzk73rh0c/x14423.png?dl=1"
                  alt=""
                />
              </div>
            </article>
          </section>
          <section className="row-start-4 row-end-7 col-start-9 col-end-13 bg-purple-100">
            <article className="p-10 flex justify-between items-center h-full">
              <div className="space-y-5">
                <h2 className="text-2xl max-w-sm ">
                  Multipurpose Wooden Trolly
                </h2>
                <h3 className="text-xl">₹ 3199</h3>
                <button className="p-2 px-6 bg-amber-900 text-white rounded-md hover:bg-amber-900">
                  Add To Cart
                </button>
              </div>
              <div>
                <img
                  className="h-auto w-80"
                  src="https://www.dropbox.com/s/ykdro56f2qltxys/hh2774663-87776.png?dl=1"
                  alt=""
                />
              </div>
            </article>
          </section>
        </section>
      </section>
    </>
  );
};

export default FeatureProduct;
