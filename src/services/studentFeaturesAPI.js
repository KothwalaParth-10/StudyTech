import toast from "react-hot-toast";
import { studentEndpoints } from "./apis";
import {apiConnector} from "../services/apiconnector"
import rzpLogo from "../assets/Logo/rzp_logo.png"

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints

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

        const orderResponse=await apiConnector("POST",COURSE_PAYMENT_API,{courses},{
             Authorization: `Bearer ${token}`
        })

        const options={
            key:process.env.RAZORPAY_KEY,
            currency:orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description:"Thank you for Purchasing the course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler:function(response){
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token)

                verifyPayment({...response,courses},token,navigate,dispatch)
            }

        }

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
// front end- class 5 1:26:00 min done