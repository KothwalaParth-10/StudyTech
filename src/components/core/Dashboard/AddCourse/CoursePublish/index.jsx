import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetails';

function PublishCourse() {

     const {register,handleSubmit,getValues,setValue,formState:{errors}}=useForm();
     const [loading,setLoading]=useState(false)
     const { course } = useSelector((state) => state.course)
     const { token } = useSelector((state) => state.auth)
     const dispatch = useDispatch();

     useEffect(()=>{
         if(course?.status  === COURSE_STATUS.PUBLISHED){
            setValue("public",true);
         }
     },[])

     const goBack=async()=>{
         dispatch(setStep(2));
     }
     const goToCourses=()=>{
        dispatch(resetCourseState());
        //navigate("/dashboard/my-courses");
     }
     const handleCoursePublish=async()=>{
              if(course?.status  === COURSE_STATUS.PUBLISHED && getValues("public",true) || course?.status  === COURSE_STATUS.DRAFT && getValues("public",false) ){
                //no updation in form
                //no need to make api call
                goToCourses();
                return;
              }
              const formData=new FormData();
              formData.append("courseId",course._id)
              const courseStatus=getValues("public")?COURSE_STATUS.PUBLISHED :COURSE_STATUS.DRAFT 
              formData.append("status",courseStatus)

              setLoading(true);
              const result=await editCourseDetails(formData,token);

              if(result){
                goToCourses();
              }

              setLoading(false);
     }
     const onSubmit=()=>{
           handleCoursePublish();
     }

  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700'>
        <p>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                  <label htmlFor='public'>
                  <input type='checkbox' id='public' {...register("public")} className='rounded h-4 w-4'></input>
                  <span>Make this Course as Public</span>
                  </label>
            </div>
            <div className="flex justify-end gap-x-3">
                <button disabled={loading} type='button'  className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`} onClick={goBack}>
                    Back
                </button>
                <IconBtn disabled={loading} text="save changes"></IconBtn>
            </div>
        </form>
    </div>
  )
}

export default PublishCourse

//editcourse api backend incomplete
//frontend-class 3 1:09:21 done