import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetails';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import Upload from '../CourseInformation/Upload';
import IconBtn from '../../../../common/IconBtn';

function SubSectionModal({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false
}) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues
    } = useForm();

    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, [])

    const handleEditSubSection = async () => {

        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);


        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }

        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }

        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo);
        }

        setLoading(true);

        const result = await updateSubSection(formData, token)
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => (modalData.sectionId === section._id ? result : section))
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            console.log(updatedCourse);
            
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null);
        setLoading(false)

    }

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.lectureTitle !== modalData.title || currentValues.lectureDesc !== modalData.description || currentValues.lectureVideo !== modalData.videoUrl) {
            return true;
        } else {
            return false;
        }
    }

    const onSubmit = async (data) => {
        if (view) {
            return;
        }
        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No Changes Made!")
            } else {
                handleEditSubSection()
            }
            return;
        }
        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc);
        formData.append("video", data.lectureVideo)
        setLoading(true);
        const result = await createSubSection(formData, token);

        if (result) {
            const updatedCourseContent=course.courseContent.map((section)=>(modalData === section._id ? result :section))
            const updatedCourse={...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null);
        setLoading(false);
    }
    return (
        <div>
            <div>
                <div>
                    <p>{view && "Viewing"}{add && "Adding"}{edit && "Editing"}</p>
                    <button onClick={() => {
                        if (!loading) {
                            setModalData(null);
                        }
                    }}>
                        <RxCross1></RxCross1>
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}>
                    </Upload>
                    <div>
                        <label>Lecture Title</label>
                        <input id='lectureTitle' placeholder='Enter lecture Title' {...register("lectureTitle", { required: true })} className='w-full'></input>
                        {
                            errors.lectureTitle && (
                                <span>
                                    Lecture Title is required
                                </span>
                            )
                        }
                    </div>
                    <div>
                        <label>Lecture Description</label>
                        <textarea id='lectureDesc' placeholder='Enter Lecture Description' {...register("lectureDesc", { required: true })} className='w-full min-h-[130px]'></textarea>
                        {
                            errors.lectureDesc && (
                                <span>
                                    Lecture Description is required
                                </span>
                            )
                        }
                    </div>
                    {
                        !view && (
                            <div>
                                <IconBtn text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}></IconBtn>
                            </div>
                        )
                    }
                </form>

            </div>

        </div>
    )
}

export default SubSectionModal
//css incomplete