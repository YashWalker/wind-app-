import React,{useState , useEffect} from 'react'
import {toast} from "react-toastify";
import {useSelector , useDispatch} from "react-redux";
import { getCoupons , removeCoupon , createCoupon } from '../../../functions/coupon';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {TrashIcon} from "@heroicons/react/outline"
import AdminBar from "../../Navbar/AdminBar";
import {Link} from "react-router-dom"

const Coupon = () => {
    const [name, setName] = useState("")
    const [discount, setDiscount] = useState("")
    const [expiry, setExpiry] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [coupons, setCoupons] = useState([])

    const {user} = useSelector((state)=>({...state}))

    useEffect(() => {
        loadAllCoupons();
    }, [])

    const loadAllCoupons=()=>{
        getCoupons().then((res)=>setCoupons(res.data));
        
    }
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true)
        createCoupon({name , expiry , discount}, user.token).then(res=>{
            
            loadAllCoupons();
            setName("");
            setDiscount("");
            setExpiry(new Date());
            setLoading(false)
            toast.success(`${res.data.name} is created`)
        }).catch((err)=>{
            toast.error("Create Coupon error" , err)
        })

    }

    const handleRemove=(couponId)=>{
        
        if(window.confirm("Delete?")){
            setLoading(true)
            removeCoupon(couponId, user.token).then((res)=>{
                loadAllCoupons()
                toast.success(`Coupon ${res.data.name} is Deleted`)
                setLoading(false)
            }).catch((err)=>{
                toast.error(`Coupon ${err} not Deleted `)
            })
    }
    }





  return (
    <>
    <div className="container flex">
      <div>
        <AdminBar />
      </div>
      <div className="flex-1">
        <div>
          <section className="container max-w-3xl p-2 mx-auto">
            <article className="bg-white rounded shadow-sm border border-gray-200 p-4 lg:p-6 my-5">
              {loading ? (
                <h2 className="mb-3 text-xl md:text-2xl font-semibold text-gray-900">
                  Loading...
                </h2>
              ) : (
                <h2 className="mb-3 text-xl md:text-2xl font-semibold text-black">
                  Create Coupon
                </h2>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1"> Name of Coupon </label>
                  <input
                    type="text"
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="Type here"
                    name="category"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1"> Discount % </label>
                  <input
                    type="text"
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="Type here"
                    name="category"
                    onChange={(e) => setDiscount(e.target.value)}
                    value={discount}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Coupon Expiry </label>
                  <br/>
                  <DatePicker className='bg-gray-100 border-gray-200 rounded-md' selected={expiry} onChange={(date)=> setExpiry(date)} required value={expiry}/>
                </div>
                <button
                  type="submit"
                  className="m-2 px-4 py-2 text-center inline-block text-white bg-amber-800 border border-transparent rounded-md hover:bg-amber-900"
                >
                  {" "}
                  Add Coupon{" "}
                </button>

                <Link
                  to="/admin/dashboard"
                  className="px-4 py-2 inline-block text-amber-800 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-amber-900"
                >
                  {" "}
                  Cancel{" "}
                </Link>
              </form>
            </article>
          </section>
        </div>
        <hr className="mb-3 border-t align-center w-10" />
        <div>
          <div className="container flex flex-col mx-auto w-full items-center justify-center  max-w-3xl p-2 ">
            <div className="px-4 py-5 sm:px-6 w-full border  bg-white shadow mb-2 rounded-md flex justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                  Available Coupons
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 ">List</p>
              </div>
              
            </div>
            <ul className="flex flex-col container max-w-3xl p-2 mx-auto">
              {coupons.map((c) => (
                <li className="border-gray-400 flex flex-row mb-2 " key={c._id}>
                  <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white rounded-md flex flex-1 items-center p-4">
                    <div className="flex-1 pl-1 md:mr-16">
                     
                    <div className="font-medium ">{c.name}</div>
                    
                    </div>
                    <div className="font-medium mx-8 ">{c.discount} %</div>
                    <div className="font-medium ">{new Date(c.expiry).toLocaleDateString()}</div>

                    <button
                      className="w-24 text-right flex justify-end "
                      onClick={() => handleRemove(c._id)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Coupon