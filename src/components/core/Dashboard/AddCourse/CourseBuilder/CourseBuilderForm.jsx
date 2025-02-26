import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { GrAddCircle } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { setLoading } from '../../../../../slices/authSlice';
import { createSection, updateSection } from '../../../../../services/operations/courseDetails';
import NestedView from "./NestedView"

function CourseBuilderForm() {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goToBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }
  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one Section")
      return;
    }

    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    dispatch(setStep(3));
  }
  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (editSectionName) {
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id
      }, token)
    } else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id
      }, token)
    }

    if(result){
       dispatch(setCourse(result));
       setEditSectionName(null);
       setValue("sectionName","");
    }

    setLoading(false);
  }

const hendleChangeEditSectionName=(sectionId,sectionName) =>{
    if(editSectionName === sectionId){
        cancelEdit();
        return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
}



  return (
    <div className='text-white'>
      <p>CourseBuilder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='sectionName'>Section name <sup>*</sup></label>
          <input id='sectionName' placeholder='Add section name' {...register("sectionName", { required: true })} className='w-full'></input>
          {errors.sectionName && (
            <span className='text-white'>Section Name is Required</span>
          )}
        </div>
        <div className='mt-5'>
          <IconBtn type="Submit" text={editSectionName ? "Edit Section Name" : "Create Section"} outline={true} customClasses={"text-yellow-5"}>
            <GrAddCircle className='text-yellow-5' size={18}></GrAddCircle>
          </IconBtn>
          {
            editSectionName && (
              <button type='button' onClick={cancelEdit} className='text-sm text-richblack-300 underline'>Cancel Edit</button>
            )
          }
        </div>
      </form>
      {
        course.courseContent.length > 0 && (
          <NestedView hendleChangeEditSectionName={hendleChangeEditSectionName}></NestedView>
        )
      }
      <div className='flex justify-end gap-x-3 mt-10'>
        <button onClick={goToBack} className='rounded-md cursor-pointer flex items-center'>Back</button>
        <IconBtn text="Next" onclick={goToNext}>
          <MdKeyboardArrowRight></MdKeyboardArrowRight>
        </IconBtn>
      </div>
    </div>
  )
}
export default CourseBuilderForm