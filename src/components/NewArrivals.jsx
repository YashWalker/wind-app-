import React from "react";

const NewArrivals = () => {
  const products = [
    {
      id: 1,
      name: "Wooden Chair",
      href: "/",
      imageURL:
        "https://res.cloudinary.com/firewood/image/upload/v1652629200/k57b1rjex4jznwe65xa3.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: " 8999 ",
      color: "Natural teak",
    },
  ];

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
                  {products.map((product) => (
                    <div key={product.id} className="group relative">
                      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                        <img
                          src={product.imageURL}
                          alt={product.imageAlt}
                          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a href={product.href}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.name}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {product.price}
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

export default NewArrivals;
