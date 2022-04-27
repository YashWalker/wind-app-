import { Transition } from "@headlessui/react";
import { React, useState } from "react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";

const Search = () => {
  const [showsearch, setShowsearch] = useState(false);

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
        className="bg-gray-800 py-3 "
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="container relative w-full px-4 ">
          <div className="relative inline-flex flex-row items-center  border-separate">
            <SearchIcon className="border-none px-0 h-8 " />
            <input
              id="searchfield"
              type="text"
              placeholder="Search..."
              className="border-none bg-transparent table-cell caret-violet-900 text-white py-0 px-4 h-10  relative float-left w-full mb-0 z-20 focus:outline-none"
            />
            <XIcon
              className="border-none px-0 h-8 cursor-pointer"
              onClick={show}
            />
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Search;
