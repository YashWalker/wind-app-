import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";


const Payment = () => {
  const [values, setValues] = useState({
    success: false,
    error: false,
  });
  const [payData, setPayData] = useState([]);

  const { orderId } = useParams();
  //const paytm = collection(db , "payments" ,'zX3ZBR7XBEz08m97tS3n' );

  useEffect(() => {
    getStatus();
  }, []);
  const { success, error } = values;
  const getStatus = async () => {
    //const payHistory = await getDocs(paytm);
    const querySnapshot = await getDocs(collection(db, "payments"));
    querySnapshot.forEach((doc) => {
      setPayData(doc.data());
    });
    
    
  };
  const status = (payData)=>{
    payData.forEach((p)=>{
      if(p.pay){
        console.log(p.pay)
        p.pay.map((i)=>{
          console.log(i)
          if(i.ORDERID===orderId){
            if(i.STATUS==='TXN_SUCCESS')
            {
                setValues({...values,success:true,error:false})
            }
            else{
              setValues({...values,success:false,error:"Payment Failed"})
            }
          }
        })
      }
    })
  }



  return (
    <>
      <h2>Order Status</h2>
      <div></div>
    </>
  );
};

export default Payment;
