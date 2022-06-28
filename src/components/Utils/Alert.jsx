import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import StarRating from "react-star-ratings";
import { StarIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams , useNavigate} from "react-router-dom";

const Alert = ({children}) => {
  const { user} = useSelector((state) => ({ ...state }));

  let [isOpen, setIsOpen] = useState(false);
  let { slug } = useParams();
  let navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    if(user && user.token){
      setIsOpen(true);
    }
    else{
      navigate({
        pathname: "/login",
        state: {from:`/product/${slug}`}
      });
    }
    
  }

  return (
    <>
      <button
        className="mx-1 px-3 py-2  inline-flex align-middle text-orangepeel border border-gray-300 rounded-md hover:bg-gray-100"
        onClick={openModal}
      >
        <StarIcon className=" mr-2 h-6 w-6 hover:fill-orangepeel " />
        {user.token ? "Give Rating" : "Login To Leave Rating"}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Give Rating
                  </Dialog.Title>
                  <div className="mt-2">
                    {children}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Alert;
