import { Transition } from "@headlessui/react";
import { React, useState } from "react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Search = () => {
  const [showsearch, setShowsearch] = useState(false);

  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/furniture?${text}`);
  };

  const show = () => {
    setShowsearch((showsearch) => !showsearch);
  };
  return (
    <>
      <button
        type="button"
        id="search-toggle"
        onClick={show}
        className=" p-1 search-icon rounded-full text-gray-600 hover:text-black focus:outline-none  focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:text-black"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="h-6 w-6 " aria-hidden="true" />
      </button>

      {/* Search bar */}
      <Transition
        show={showsearch}
        className=" py-3 "
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="container relative w-full px-4 ">
          <div className="relative inline-flex flex-row items-center  border-separate">
            <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
              <div className=" relative ">
                <input
                  onChange={handleChange}
                  type="search"
                  value={text}
                  className="cursor-pointer appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
                  placeholder="Search"
                />
              </div>
            </form>
            {/* <XIcon
              className="border-none px-0 h-8 cursor-pointer"
              onClick={show}
            /> */}
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Search;
