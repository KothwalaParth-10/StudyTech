import toast from "react-hot-toast";
import { studentEndpoints } from "./apis";
import {apiConnector} from "../services/apiconnector"
import rzpLogo from "../assets/Logo/rzp_logo.png"
import { setPaymentLoading} from "../slices/courseSlice"
import { resetCart} from "../slices/cartSlice"

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API,GET_RAZORPAYKEY}=studentEndpoints

function loadScript(src){
     return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=src

        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script)
     })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
     const toastId=toast.loading("Loading...")
     try{
        const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay SDK failed to load")
            return;
        }
         
        const razorpayKeyResponse = await apiConnector("GET", GET_RAZORPAYKEY);
        const razorpayKey = razorpayKeyResponse.data.key;
        console.log("Razorpay Key:", razorpayKey);

        const orderResponse=await apiConnector("POST",COURSE_PAYMENT_API,{courses},{
             Authorization: `Bearer ${token}`
        })
        console.log(orderResponse.data);
        
        const options={
            key:razorpayKey,
            currency:orderResponse.data.message.currency,
            amount:`${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"StudyNotion",
            description:"Thank you for Purchasing the course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler:function(response){
                sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token)

                verifyPayment({...response,courses},token,navigate,dispatch)
            }

        }
        const paymentObject=new window.Razorpay(options);
        paymentObject.open()
        toast.dismiss(toastId);
        paymentObject.on("payment.failed",function(response){
            toast.error("oops, payment Failed");
         console.log(response);          
        })

     }catch(error){
          console.log("payment api error",error);
          toast.error("Could not make Payment")
          
     }
}

async function sendPaymentSuccessEmail(response,amount,token){
    try{
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount
        },{
            Authorization: `Bearer ${token}`
       })

    }catch(error){
            console.log("PAYMENT SUCCESS EMAIL ERROR...",error);
            
    }
}


async function verifyPayment(bodyData,token,navigate,dispatch){
        const toastId=toast.loading("Verifying Payment...");
        dispatch(setPaymentLoading(true));
        try{

            const res=await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
                Authorization: `Bearer ${token}`
            })

            toast.success("Payment successful")
            navigate("/dashboard/enrolled-courses");
            dispatch(resetCart())

        }catch(error){
             console.log("PAYMENT VERIFY ERROR",error);     
             toast.error("Could not verify Payment",toastId)     
        }
        toast.dismiss(toastId);
        dispatch(setPaymentLoading(false));
} 
// front end- class 6 done