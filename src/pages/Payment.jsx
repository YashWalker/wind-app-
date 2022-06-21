import React , { useState , useEffect } from "react"
import {db} from "../firebase";
import {useParams} from "react-router-dom"
import { collection , doc, getDoc, getDocs } from "firebase/firestore";

const Payment = () => {
  const[values,setValues]=useState({
    success:false,
    error:false
})
const [pay , setPay] = useState([])

const { orderId } = useParams()
const paytm = collection(db , "payments");

useEffect(() => {
    getStatus();
}, [])
const{success,error}=values
const getStatus= async()=>
{   
   const payHistory = await getDocs(paytm);
   payHistory.forEach((doc) => {
    console.log(`${doc.id} => ${doc}`)
    
     
  })
    //  setPay(payHistory.docs.map((doc)=>({...doc.data(), id: doc.id})))
    //  pay.map((p)=>{
    //   console.log(p)
    //   if(p.ORDERID===orderId)
    //             {
    //                 if(p.STATUS==='TXN_SUCCESS')
    //                 {
    //                     setValues({...values,success:true,error:false})
    //                 }
                    
    //             }
    //             else
    //             {
    //                 setValues({...values,success:false,error:"Payment Failed"})
    //             }
    //  })
  
    }
    // db.collection('payments').doc('5uZdQwpSfeqZjBwEycB2').get().then(doc=>{
    //     if(doc)
    //     {
    //         doc.data().paymentHistory.map((data)=>{
    //             if(data.ORDERID===orderId)
    //             {
    //                 if(data.STATUS==='TXN_SUCCESS')
    //                 {
    //                     setValues({...values,success:true,error:false})
    //                 }
                    
    //             }
    //             else
    //             {
    //                 setValues({...values,success:false,error:"Payment Failed"})
    //             }
    //         })
    //     }
    // })

  return (
    <><h2>Order Status</h2>
     <div>
            {
                success && <h1>Payment Succesfully</h1>
            }
            {
                error && <h1>{error}</h1>
            }
        </div>
    
    </>
  )
}

export default Payment