import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import {ACCOUNT_TYPE} from "../../../utils/constants"
import {addToCart} from "../../../slices/cartSlice"
import { BiSolidRightArrow } from 'react-icons/bi';

function CourseDetailsCard({course,setConfirmationModal,handleBuyCourse}) {
        
     const {user}=useSelector((state)=>state.profile);
     const {token}=useSelector((state)=>state.auth);
     const navigate=useNavigate();
     const dispatch=useDispatch();
    
    const {
      thumbnail:ThumbnailImage,
      price:CurrentPrice
    }=course
     
    const handleAddToCart=()=>{
         if(user && user?.accountType == ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("Your are an Instructor, you cant buy a course");
            return;
         }

         if(token){
             dispatch(addToCart(course));
             return;
         }
         setConfirmationModal({
          text1:"you are not logged in",
          text2:"please login to add to cart",
          btn1Text:"login",
          btn2Text:"cancel",
          btn1Hander:()=>navigate("/login"),
          btn2Hander:()=>setConfirmationModal(null)
         })
    }

    const handleShare=()=>{
      copy(window.location.href);
      toast.success("Link Copy to Clipboard")
    }

  return (
    <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
        <img 
            src={ThumbnailImage}
            alt='Thumbnail Image'
            className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full'
        />
        <div className='px-4'>
        <div className='space-x-3 pb-4 text-3xl font-semibold'>
            Rs. {CurrentPrice}
        </div>
        <div className='flex flex-col gap-y-6'>
            <button className='yellowButton'
                onClick={
                    user && course?.studentsEnrolled.includes(user?._id)
                    ? ()=> navigate("/dashboard/enrolled-courses")
                    : handleBuyCourse
                }
            >
                {
                    user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course ": "Buy Now"
                }
            </button>

        {
            (!course?.studentsEnrolled.includes(user?._id)) && (
                <button onClick={handleAddToCart} className='blackButton'>
                    Add to Cart
                </button>
            )
        }
        </div>

        <div>
            <p className='pb-3 pt-6 text-center text-sm text-richblack-25'>
                30-Day Money-Back Guarantee
            </p> 
        </div>
        <div>
            <p className='my-2 text-xl font-semibold '>
                This Course Includes:
            </p>
            <div className='flex flex-col gap-3 text-sm text-caribbeangreen-100'>
                {
                    JSON.parse(course?.instructions).map((item, index)=> (
                        <p key={index} className='flex gap-2'>
                           <BiSolidRightArrow/>
                            <span>{item}</span>
                        </p>
                    ))
                }
            </div>
        </div>
        <div className='text-center'>
            <button
            className='mx-auto flex items-center gap-2 py-6 text-yellow-100 '
            onClick={handleShare}
            >
                Share
            </button>
        </div>
        </div>
    </div>
  )
}

export default CourseDetailsCard

//frontend-6 