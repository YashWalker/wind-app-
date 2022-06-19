import React from "react";
import { Link } from "react-router-dom";

const RelatedItem = ({ related, product }) => {
  return (
    <>
      <section className="bg-gray-100 py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-wrap -mx-2">
            <div className="lg:w-3/4 px-2">
              <article className="border border-gray-200 shadow-sm rounded bg-white">
                <nav className="border-b px-4">
                  <Link
                    to="#"
                    className="px-3 py-4 mx-1 inline-block border-b border-blue-600 text-blue-600 hover:border-blue-600 hover:text-blue-500"
                  >
                    Overview
                  </Link>
                  <Link
                    to="#"
                    className="px-3 py-4 mx-1 inline-block hover:border-blue-600 hover:text-blue-500"
                  >
                    Specification
                  </Link>
                  <Link
                    to="#"
                    className="px-3 py-4 mx-1 inline-block hover:border-blue-600 hover:text-blue-500"
                  >
                    Delivery
                  </Link>
                  <Link
                    to="*"
                    target="_self"
                    className="px-3 py-4 mx-1 inline-block hover:border-blue-600 hover:text-blue-500"
                  >
                    Payment info
                  </Link>
                  <Link
                    to="#"
                    className="px-3 py-4 mx-1 inline-block hover:border-blue-600 hover:text-blue-500"
                  >
                    Seller profile
                  </Link>
                </nav>
                <div className="p-5 text-gray-700">
                  <p className="mb-3 overflow-hidden">{product.description}</p>
                  <p className="mb-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. <br />{" "}
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p className="mb-3">
                    Dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.{" "}
                    <br /> Excepteur sint occaecat cupidatat non proident, sunt
                    in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p className="mb-3">
                    Consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur.
                  </p>
                </div>
              </article>
            </div>
            <aside className="lg:w-1/4 px-2">
              <article className="border border-gray-200 shadow-sm rounded bg-white p-4">
                <h3 className="mb-5 text-lg font-semibold">Similar products</h3>

                {related.length ? (
                  related.map((r) => (
                    <div key={r._id} className="col-md-4">
                      <figure className="flex flex-row mb-4">
                        <div>
                          <Link
                            to={`/product/${r.slug}`}
                            className="block w-20 h-20 rounded border border-gray-200 overflow-hidden"
                          >
                            <img src={r.images?.[0].url} alt={r.title} />
                          </Link>
                        </div>
                        <figcaption className="ml-3">
                          <p>
                            <Link
                              to={`/product/${r.slug}`}
                              className="text-gray-600 hover:text-blue-600"
                            >
                              {r.title}
                            </Link>
                          </p>
                          <p className="mt-1 font-semibold">{r.sellprice}</p>
                        </figcaption>
                      </figure>
                    </div>
                  ))
                ) : (
                  <div className="text-center col">No Products Found</div>
                )}
              </article>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default RelatedItem;
