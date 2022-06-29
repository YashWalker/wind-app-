import React from "react";


const Filters = ({ showCategories , price}) => {
 
  
  return (
    <>
      <aside className="md:w-1/3 lg:w-1/4 px-4">
        <a
          className="md:hidden mb-5  w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
          href="#"
        >
          Filter by
        </a>

        <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
          <h3 className="font-semibold mb-2">Category</h3>

          <ul className="text-gray-500 space-y-1">
            <li>
              {showCategories}
            
              
            </li>
            
          </ul>

          <hr className="my-4" />
          <h3 className="font-semibold mb-2">Price</h3>
          <ul className="space-y-1">
            <li>
              <label for="pricerange" className="flex items-center flex-col">
                <div className="flex flex-row justify-between w-full my-2">
                  <span className="ml-2 text-gray-500 mx-1"> Min </span>
                  <span className="ml-2 text-gray-500"> Max </span>
                </div>
                {/* <input
                  type="range"
                  className="w-full  bg-gray-200 rounded-lg appearance-none cursor-pointer z-50  "
                  id="pricerange"
                  min={0}
                  max={100000}
                  step={500}
                  value={price}
                  onChange={handleSlider}
                  defaultValue={0}
                /> */}
                
               
              </label>
            </li>
          </ul>

          <hr className="my-4" />
          <h3 className="font-semibold mb-2">Price</h3>
          <ul className="space-y-1">
            <li>
              <label className="flex items-center">
                <input name="" type="checkbox" checked="" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Samsung </span>
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input name="" type="checkbox" checked="" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Huawei </span>
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input name="" type="checkbox" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Tesla model </span>
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input name="" type="checkbox" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Best brand </span>
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input name="" type="checkbox" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Other brands </span>
              </label>
            </li>
          </ul>

          <hr className="my-4" />

          <h3 className="font-semibold mb-2">Sort by</h3>
          <ul className="space-y-1">
            <li>
              <label className="flex items-center">
                <input
                  name="myselection"
                  type="radio"
                  checked=""
                  className="h-4 w-4"
                />
                <span className="ml-2 text-gray-500"> Lightblue </span>
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input name="myselection" type="radio" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Orange </span>
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input name="myselection" type="radio" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Silver </span>
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input name="myselection" type="radio" className="h-4 w-4" />
                <span className="ml-2 text-gray-500"> Darkblue </span>
              </label>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Filters;
