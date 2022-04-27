import { Dialog, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <Transition show={true}>
        <Dialog
          open={isOpen}
          className="container"
          onClose={() => setIsOpen(false)}
        >
          <main className="">
            <div className="">
              <div className=" flex justify-center items-center px-6 my-12">
                {/* <!-- Row --> */}
                <div className="shadow-md shadow-amber-700 w-full xl:w-3/4 lg:w-11/12 flex">
                  {/* <!-- Col --> */}
                  <div
                    className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                    style={{
                      backgroundImage:
                        " url('https://images.pexels.com/photos/4846106/pexels-photo-4846106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                    }}
                  ></div>
                  {/* <!-- Col --> */}
                  <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                    <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                      <div className="mb-4">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="username"
                        >
                          Email
                        </label>
                        <input
                          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="username"
                          type="email"
                          placeholder="Your Email Address"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <input
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="password"
                          type="password"
                          placeholder="Your Password"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          className="mr-2 leading-tight"
                          type="checkbox"
                          id="checkbox_id"
                        />
                        <label className="text-sm" htmlFor="checkbox_id">
                          Remember Me
                        </label>
                      </div>
                      <div className="mb-6 text-center">
                        <button
                          className="w-full px-4 py-2 font-bold text-bistre hover:text-white bg-orangepeel  rounded-lg "
                          type="button"
                        >
                          Sign In
                        </button>
                      </div>
                      <hr className="mb-6 border-t" />
                      <div className="text-center">
                        <Link
                          className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                          to="/Signup"
                        >
                          Create an Account!
                        </Link>
                      </div>
                      <div className="text-center">
                        <Link
                          className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                          to="/ForgotPassword"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </Dialog>
      </Transition>
    </>
  );
};

export default Login;
