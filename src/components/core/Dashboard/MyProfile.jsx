import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from "../../common/IconBtn"
import { FaRegEdit } from 'react-icons/fa'
import {formattedDate} from "../../../utils/dateformetter"

function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  console.log(user);
  
  const navigate = useNavigate();
  return (
    <div >
      <h1 className="mb-14 text-3xl font-medium text-white">My Profile</h1>
      {/* section-1 */}
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img src={user?.image}
            alt={`profile-${user?.firstname}`} className='aspect-square w-[78px] rounded-full object-cover'></img>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-white">
              {user?.firstname + " " + user?.lastname}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn text="Edit" onclick={() => {
          navigate("/dashboard/settings")
        }}>
          <FaRegEdit></FaRegEdit>
        </IconBtn>
      </div>
      {/* section-2 */}
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p  className="text-lg font-semibold text-white">About</p>
          <IconBtn text="Edit" onclick={() => {
            navigate("/dashboard/settings")
          }}>
            <FaRegEdit></FaRegEdit>
          </IconBtn>
        </div>
        <p
        className={`${
          user?.additionalDetails?.about
            ? "text-white"
            : "text-richblack-400"
        } text-sm font-medium`}
      >
        {user?.additionalDetails?.about ?? "Write Something About Yourself"}
      </p>
      </div>
      {/* section- 3*/}
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
        <p className="text-lg font-semibold text-white">
          Personal Details
        </p>
          <IconBtn text="Edit" onclick={() => {
            navigate("/dashboard/settings")
          }}>
            <FaRegEdit></FaRegEdit>
          </IconBtn>
        </div>

        <div className="flex max-w-[500px] justify-between">
        <div  className="flex flex-col gap-y-5">
        <div >
            <p className="mb-2 text-sm text-richblack-600">First Name</p>
            <p className="text-sm font-medium text-white">
              {user?.firstname ?? "-"}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Email</p>
            <p className="text-sm font-medium text-white">
              {user?.email ?? "-"}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Gender</p>
            <p className="text-sm font-medium text-white">
              {user?.additionalDetails?.gender ?? "-"}
            </p>
          </div>
        </div>
         <div  className="flex flex-col gap-y-5">
         <div>
            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
            <p className="text-sm font-medium text-white">
              {user?.lastname ?? "-"}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
            <p className="text-sm font-medium text-white">
              {user?.additionalDetails?.contactNumber ?? "-"}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
            <p className="text-sm font-medium text-white">
              {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                "-"}
            </p>
          </div>
         </div>
        </div>

      </div>

    </div>
  )
}
//front-end-class-7 15: left
export default MyProfile