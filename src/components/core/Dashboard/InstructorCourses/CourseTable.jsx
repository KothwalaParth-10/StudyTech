import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { COURSE_STATUS } from "../../../../utils/constants"
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import ConfirmationModal from "../../../common/ConfirmationModal"
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetails';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useNavigate } from 'react-router-dom';
import { formatDate } from "../../../../services/formatDate"
import { FaCheck } from "react-icons/fa"
import convertSecondsToDuration from '../../../../utils/secToDurationFrontend'

function CourseTable({ courses, setCourses }) {

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationmodal, setconfirmationmodal] = useState(null);
    const navigate = useNavigate();
    const TRUNCATE_LENGTH = 30

    const handleCourseDelete = async (courseId) => {
        setLoading(true);
        await deleteCourse({ courseId: courseId }, token)
        const result = await fetchInstructorCourses(token);
        if (result) {
            setCourses(result)
        }
        setconfirmationmodal(null);
        setLoading(false)
    }

    function getDuration(course) {
        let totalDurationInSeconds = 0
        course.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
      return totalDuration
      }


    return (
        <div >
            <Table className="rounded-xl border border-richblack-800 ">
                <Thead >
                    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            Courses
                        </Th>
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            Duration
                        </Th>
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            Price
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Actions
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        courses.length === 0 ? (
                            <Tr>
                                <Td className="py-10 text-center text-2xl font-medium text-richblack-100">No Courses Found</Td>
                            </Tr>
                        ) : (
                            courses?.map((course) => {
                                return (
                                    <Tr key={course._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                                        <Td className="flex flex-1 gap-x-4">
                                            <img src={course?.thumbnail} className="h-[148px] w-[220px] rounded-lg object-cover">
                                            </img>
                                            <div className="flex flex-col justify-between">
                                                <p className="text-lg font-semibold text-richblack-5">
                                                    {course.courseName}
                                                </p>
                                                <p className="text-xs text-richblack-300">                                                  
                                                    {course.courseDescription.split(" ").length >
                                                        TRUNCATE_LENGTH
                                                        ? course.courseDescription
                                                            .split(" ")
                                                            .slice(0, TRUNCATE_LENGTH)
                                                            .join(" ") + "..."
                                                        : course.courseDescription}
                                                </p>
                                                <p className="text-[12px] text-white">Created: {formatDate(course.createdAt)}{console.log(course.createdAt)}</p>
                                                {
                                                    course.status === COURSE_STATUS.DRAFT ? (
                                                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                            <HiClock size={14} />
                                                            DRAFTED</p>
                                                    ) : (
                                                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                                <FaCheck size={8} />
                                                            </div>PUBLISHED</p>
                                                    )
                                                }
                                            </div>
                                        </Td>
                                        <Td className="text-sm font-medium text-richblack-100">
                                        {getDuration(course)}
                                        </Td>
                                        <Td className="text-sm font-medium text-richblack-100">
                                            ₹{course.price}
                                        </Td>
                                        <Td className="text-sm font-medium text-richblack-100 ">
                                            <button
                                                onClick={() => {
                                                    navigate(`/dashboard/edit-course/${course._id}`)
                                                }}
                                                disabled={loading} className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
                                                <MdOutlineEdit />
                                            </button>
                                            <button disabled={loading} onClick={() => {
                                                setconfirmationmodal({
                                                    text1: "Do you want to delete this course?",
                                                    text2: "All the data related to this course will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: !loading ? () => {
                                                        handleCourseDelete(course._id)
                                                    } : () => {

                                                    },
                                                    btn2Handler: !loading ? () => {
                                                        setconfirmationmodal(null)
                                                    } : () => {

                                                    }
                                                })
                                            }}  className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"  title="Delete">
                                                <MdOutlineDelete></MdOutlineDelete>
                                            </button>
                                        </Td>
                                    </Tr>
                                )
                            })
                        )
                    }
                </Tbody>
            </Table>
            {confirmationmodal && <ConfirmationModal modalData={confirmationmodal}></ConfirmationModal>}
        </div>
    )
}

export default CourseTable

//css apply till here
//edit course peding css