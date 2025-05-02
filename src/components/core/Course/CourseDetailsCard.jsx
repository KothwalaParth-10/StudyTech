import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

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

    }

    const handleShare=()=>{

    }

  return (
    <div>
      <img src={ThumbnailImage} alt='Thumbnail Image' className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl'></img>

      <div>
        Rs. {CurrentPrice}
      </div>

      <div className='flex flex-col gap-y-6'>
           <button onClick={
            user && course?.studentsEnrolled.includes(user?._id)?()=>navigate("/dashboard/enrolled-courses"):handleBuyCourse
           }>
              {
                user && course?.studentsEnrolled.includes(user?._id)?"Go to Course":"Buy Now"
              }
           </button>
           {
               (
                !course?.studentsEnrolled.includes(user._id) && (
                  <button onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                )
               )
           }
      </div>
      <div>
        <p>
          30-Day Money-Back Guarantee
        </p>
        <p>
          This Course Includes:
        </p>
        <div>
          {
            course?.instructions?.map((item,index)=>{
              return (
                <p key={index} className='flex gap-2'><span>{item}</span></p>
              )
            })
          }
        </div>
      </div>
      <div>
        <button onClick={handleShare}>
          Share
        </button>
      </div>
    </div>
  )
}

export default CourseDetailsCard

//frontend-6 1:59:00