import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../services/studentFeaturesAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from "../services/operations/courseDetails"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"
import ConfirmationModal from "../components/common/ConfirmationModal"
import RatingStars from "../components/common/RatingStars"
import toast from 'react-hot-toast';
import { formatDate } from "../services/formatDate"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"

function CourseDetails() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { loading } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart)
  const { courseId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [courseData, setCourseData] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        // console.log("Printing CourseData-> " , result);
        setCourseData(result);
      } catch (error) {
        toast.error("Could not get course")
        console.log("Could not fetch coursse details");
      }
    }

    getCourseFullDetails();
  }, [courseId])

  useEffect(() => {
    const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
    setAvgReviewCount(count);
  }, [courseData])

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [courseData])

  //Will store sectionIds for enabling the dropdown
  // const [isActive, setIsActive] = useState([]);
  // const handleActive = (id)=> {
  //     setIsActive(
  //         !isActive.includes(id) ? isActive.concat(id) : isActive.filter((e)=> e != id)
  //     )
  // }

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "you are not Logged in",
      text2: "Please login to purchase the course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (loading || !courseData) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    )
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatWillYouLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData.data?.courseDetails;
  return (
    <div className='flex flex-col  text-white'>

      <div className=' relative flex flex-col justify-start p-8'>
        <p>{courseName}</p>
        <p>{courseDescription}</p>
        <div className='flex gap-x-2'>
          <span>{avgReviewCount}</span>
          <RatingStars Review_Count={avgReviewCount} Star_Size={24}></RatingStars>
          <span>{`(${ratingAndReviews.length} reviews) `}</span>
          <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
        </div>
        <div>
          <p>Created By {`${instructor.firstname} ${instructor.lastname}`}</p>
        </div>
        <div>
          <p>Created At {formatDate(createdAt)} <span> {" "} English</span></p>
          
        </div>

        <div>
          <CourseDetailsCard 
          course={courseData?.data?.courseDetails}
          setConfirmationModal={setConfirmationModal}
          handleBuyCourse={handleBuyCourse}
          ></CourseDetailsCard>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>}
    </div>
  )
}

export default CourseDetails

