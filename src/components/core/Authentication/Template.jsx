import React from 'react'
import Signupform from './Signupform'
import FrameImage from "../../../assets/Images/frame.png" 
import { FcGoogle } from "react-icons/fc";
import LoginForm from './LoginForm';
function Template({title, desc1, desc2, image, formtype, setisLoggedin,pageclass}) {
    return (
        <div className={`${pageclass === "Login"?"h-screen overflow-hidden":"max-h-max"} flex w-11/12 max-w-[1160px]   mx-auto py-12 gap-y-0 gap-x-12 justify-between`}>
          <div className='w-11/12 max-w-[450px]'>
            <h1 className="text-richblack-25 font-semibold text-[1.875rem] leading-[2.375]">{title}</h1>
            <p className='mt-4 text-[1.125rem] leading-[1.625rem]'>
              <span className="text-richblack-25">{desc1}</span><br></br>
              <span className="text-richblack-25 italic">{desc2}</span>
            </p>
    
            {
                (formtype === "signup")?(<Signupform setisLoggedin={setisLoggedin}></Signupform>):(<LoginForm setisLoggedin={setisLoggedin}></LoginForm>)
            }
    
            <div className='flex w-full items-center my-4 gap-x-2'>
              <div className='w-full h-[1px] bg-richblack-700'></div>
              <p className='text-richblack-700 font-medium leading-[1.375rem]'>OR</p>
              <div className='w-full h-[1px] bg-richblack-700'></div>
            </div>
    
            <button className='w-full flex justify-center items-center border border-richblack-700 rounded-[8px] font-medium text-richblack-100 px-[12px] py-[8px] gap-x-2 mt-6 '>
              <FcGoogle></FcGoogle>
              Sign in with Google
              </button>
          </div>
            <div className='relative w-11/12 max-w-[450px]'>
              <img src={FrameImage} loading='lazy' width={558} height={504} alt='Pattern'></img>
    
              <img src={image} loading='lazy' width={558} height={490} alt='students' className="absolute -top-4 right-4"></img>
            </div>
        </div>
      )
}

export default Template