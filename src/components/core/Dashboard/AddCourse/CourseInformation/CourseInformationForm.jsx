import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetails';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from './RequirementField';
import IconBtn from "../../../../common/IconBtn"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import toast from 'react-hot-toast';
import ChipInput from './ChipInput';
import Upload from './Upload';

function CourseInformationForm() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm()

    const dispatch = useDispatch();
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setcourseCategories] = useState([]);
    const { token } = useSelector((state) => state.auth)

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            console.log(categories);

            if (categories.length > 0) {
                setcourseCategories(categories);
            }
            setLoading(false);
        }
        if (editCourse) {
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseTags", course.tag)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
        getCategories();
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.ccourseBenefits !== course.whatYouWillLearn ||
             currentValues.courseTags.toString() !== course.courseName ||
            currentValues.courseCategory !== course.category._id ||
            currentValues.courseRequirements !== course.instructions.toString()||
            currentValues.courseImage !== course.courseName
        ) {
            return true;
        } else {
            return false;
        }
    }

    const onSubmit = async (data) => {

        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();
                formData.append("courseId", course._id);

                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }
                if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if (result) {
                    setStep(2);
                    dispatch(setCourse(result));
                }
            } else {
                toast.error("No Chnages made so far");
            }
            return;
        }
        // Create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("tags", JSON.stringify(data.courseTags))
        formData.append("whatWillYouLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
         formData.append("thumbnailImage", data.courseImage)
        formData.append("status", COURSE_STATUS.DRAFT);

        setLoading(true);
        console.log(formData.courseName);

        const result = await addCourseDetails(formData, token);
        console.log(result);
        
        if (result) {
           dispatch(setStep(2));
            dispatch(setCourse(result))
        }
        setLoading(false);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseTitle">Course Title <sup className="text-pink-200">*</sup></label>
                <input id='courseTitle'
                    placeholder='Enter Course Title'
                    {...register("courseTitle", {
                        required: true
                    })} className='form-style w-full'></input>
                {
                    errors.courseTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course title is required
                        </span>
                    )
                }
            </div>

            <div className='flex flex-col space-y-2'>
                <label htmlFor='courseShortDesc' className=' text-sm text-richblack-5'>Course Short Description<sup className=' text-pink-200'>*</sup></label>
                <textarea id='courseShortDesc' placeholder='Enter Description'
                    {...register("courseShortDesc", { required: true })}
                    className=' form-style resize-x-none min-h-[130px] w-full'
                />
                {
                    errors.courseShortDesc && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Description is required
                        </span>
                    )
                }
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="coursePrice">
                    Course Price <sup className="text-pink-200">*</sup>
                </label>
                <div className="relative">
                    <input id='coursePrice'
                        placeholder='Enter Course Price'
                        {...register("coursePrice", {
                            required: true,
                            valueAsNumber: true,
                            pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            }
                        })} className="form-style w-full !pl-12"></input>
                    <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
                </div>

                {errors.coursePrice && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Price is required
                    </span>
                )}
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor='courseCategory' className="text-sm text-richblack-5">
                    Category <sup className="text-pink-200">*</sup>
                </label>
                <select
                    id='courseCategory'
                    defaultValue=""
                    {...register("courseCategory", { required: true })} className='form-style w-full'>
                    <option value="" disabled>Choose a category</option>
                    {
                        !loading && courseCategories.map((category, index) => {
                            return (
                                <option value={category?._id} key={index}>{category?.name}</option>
                            )
                        })
                    }
                </select>
                {errors.courseCategory && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Category is required
                    </span>
                )}
            </div>
            {/* handling tags */}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and Press Enter"
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
            />

            {/* create a componenet for uploading and showing preview of media */}

            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />

            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5">Benefits of the course<sup className="text-pink-200">*</sup></label>
                <textarea id='coursebenefits' placeholder='Enter Benefits of the course' {...register("courseBenefits", { required: true })} className="form-style resize-x-none min-h-[130px] w-full">
                </textarea>
                {
                    errors.courseBenefits && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Benefits of the course are required</span>
                    )
                }
            </div>

            <RequirementField name="courseRequirements" label="Requirements/Instructions" register={register} errors={errors} setValue={setValue} getValues={getValues}></RequirementField>
            <div>
                {
                    editCourse && (
                        <button onClick={() => dispatch(setStep(2))} className='flex items-center gap-x-2 bg-richblack-300'>
                            Continue Without Saving
                        </button>
                    )
                }
                <IconBtn text={!editCourse ? "Next" : "Save Changes"}></IconBtn>
            </div>

        </form>
    )
}

export default CourseInformationForm
// front-end-1) done