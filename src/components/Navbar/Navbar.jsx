import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  MenuAlt1Icon,
  XIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { LogoutIcon } from "@heroicons/react/solid";
import Search from "../Utils/Search";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const navigation = [
  { name: "Home", to: "/", current: true },
  { name: "New Arrival", to: "/", current: false },
  { name: "Furniture", to: "/furniture", current: false },
  { name: "About Us", to: "/", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let { user, cart } = useSelector((state) => ({ ...state }));

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
      })
      .catch(() => {
        console.log(Error);
      });

    navigate("/login");
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-md">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2  text-gray-600 hover:text-orangepeel focus:outline-none ">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuAlt1Icon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-10 w-auto"
                    src={`/Assets/images/Icon-Logo.svg`}
                    alt="Woodkoof"
                  />
                  <img
                    className="hidden lg:block h-7 w-auto"
                    src={`/Assets/images/vector/isolated-monochrome-black.svg`}
                    alt="Woodkoof"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex  space-x-5">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "text-orangepeel "
                            : "text-gray-600   hover:text-orangepeel",
                          "px-3 py-2  text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Search />

                <Link
                  to="/cart"
                  className=" p-1 rounded-full text-gray-600 hover:text-black mr-2"
                >
                  <span className="text-xs text-white  relative bottom-0.5 left-4  ">
                    {cart.length > 0 ? (
                      <span className="p-1 rounded-full  bg-red-500">
                        {cart.length}
                      </span>
                    ) : (
                      <span className="text-transparent bg-transparent">
                        {cart.length}
                      </span>
                    )}
                  </span>
                  <ShoppingCartIcon
                    className="h-6 w-6 relative bottom-3"
                    aria-hidden="true"
                  />
                </Link>

                {/* Profile dropdown */}
                {user ? (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className=" p-1 rounded-full text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <UserCircleIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              className={classNames(
                                active ? "bg-gray-200" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {`Hi , ${user.name}`}
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`${
                                user.role === "admin"
                                  ? "/admin/dashboard"
                                  : "/user/profile"
                              }`}
                              className={classNames(
                                active ? "bg-gray-200" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Account
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/Login"
                              className={classNames(
                                active ? "bg-gray-200" : "",
                                " px-4 py-2 text-sm text-gray-700 block"
                              )}
                              onClick={logout}
                            >
                              <LogoutIcon className="w-6 h-6 inline-flex" />{" "}
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    type="button"
                    to="/login"
                    className="p-1 cursor-pointer text-gray-700 font-medium hover:text-orangepeel border-b-orangepeel "
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col justify-center items-center">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  to={item.to}
                  className={classNames(
                    item.current
                      ? " text-orangepeel"
                      : "text-gray-600  hover:text-orangepeel",
                    "block px-3 py-2  text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
