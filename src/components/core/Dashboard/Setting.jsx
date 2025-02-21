import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { FiUpload } from 'react-icons/fi';
import { uploadDp } from "../../../services/operations/authAPI"
import { postUserdetails } from "../../../services/operations/ProfileAPI"
import UpdatePassword from './Settings/UpdatePassword';
import DeleteAccount from './Settings/DeleteAccount';

function Setting() {
    const { loarding: profileloading, user } = useSelector((state) => state.profile);
    const { loarding: authloading, token } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [formData, setformData] = useState({
        dateOfBirth: "",
        about: "",
        contactNumber: null,
        gender: ""
    })


    const [fileName, setFileName] = useState(null);
    if (profileloading || authloading) {
        return (
            <div className='loader'></div>
        )
    }
    if (!user) {
        toast.error("Please Login first");
        return <Navigate to="/"></Navigate>
    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file);
        toast.success("Files Selected Successfully")

    };

    const HandleData = (event) => {
        console.log(event.target.name + " " + event.target.value);

        setformData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-white">Edit Profile</h1>
            {/* section-1 */}
            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className='flex items-center justify-start gap-x-4'>

                    <img src={user?.image}
                        alt={`profile-${user?.firstName}`} className='aspect-square w-[78px] rounded-full object-cover'></img>
                    <div className='flex flex-col'>
                        <p className="mb-4 text-md text-white">Change Profile Picture</p>
                        <div className='flex justify-center items-center gap-x-2'>
                            <div>
                                <input
                                    type="file"
                                    id="photoInput"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />

                                {/* Custom Button */}
                                <label
                                    htmlFor="photoInput"
                                    className="cursor-pointer  bg-richblack-600  text-white rounded-md py-3 px-5"
                                >
                                    Select
                                </label>
                            </div>
                            <div>
                                <IconBtn text="Upload" onclick={() => {
                                    dispatch(uploadDp(fileName, token, user))
                                }}>{<FiUpload></FiUpload>}</IconBtn>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* section-2 */}
            <div className="flex flex-col rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 mt-4">
                <h1 className="mb-4 text-md text-white">Profile Information</h1>
                <div className='flex flex-col gap-3  lg:justify-between w-full'>
                    <div className='flex flex-col lg:flex-row gap-3'>
                        <div className="flex flex-col lg:w-1/2 space-y-2">
                            <label className="text-sm text-richblack-5" htmlFor="courseTitle">First Name</label>
                            <div
                                className='form-style w-full'>{user?.firstname}
                            </div>
                        </div>
                        <div className="flex flex-col lg:w-1/2 space-y-2">
                            <label className="text-sm text-richblack-5" htmlFor="courseTitle">Last Name</label>
                            <div
                                className='form-style w-full'>{user?.lastname}
                            </div>
                        </div>
                    </div>

                    <form>
                        <div className='flex flex-col lg:flex-row gap-3'>
                            <div className="flex flex-col lg:w-1/2 space-y-2">
                                <label className="text-sm text-richblack-5" htmlFor=" dateOfBirth">Date Of Birth</label>
                                <input id=' dateOfBirth' name='dateOfBirth' onChange={HandleData} type='date' className='form-style w-full'></input>
                            </div>
                            <div className="flex flex-col lg:w-1/2 space-y-2">
                                <label className="text-sm text-richblack-5" htmlFor="gender">Gender</label>
                                <select defaultValue="" name='gender' id='gender' className='form-style w-full h-[90%]' onChange={HandleData}
                                    required >
                                    <option value="" disabled>Choose gender</option>
                                    <option value="Male" >Male</option>
                                    <option value="Female" >Female</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row lg:space-x-3 space-y-1 sm:mt-5'>
                            <div className="flex flex-col lg:w-1/2 space-y-2">
                                <label className="text-sm text-richblack-5" htmlFor="contactNumber" >Contact Number</label>
                                <input type='number' inputMode='numeric' pattern="[0-9]*" className='form-style w-full' id='contactNumber' name='contactNumber' onChange={HandleData} placeholder="Enter Contact Number"
                                ></input>
                            </div>
                            <div className="flex flex-col lg:w-1/2 space-y-2 mt-5">
                                <label className="text-sm text-richblack-5" htmlFor="about">About</label>
                                <input type='text' placeholder='Enter Bio Details' className='form-style w-full' onChange={HandleData} id='about' name='about'
                                ></input>
                            </div>
                        </div>
                    </form>

                    <div className='flex justify-end items-center gap-x-2 mt-2'>
                        <div>


                            {/* Custom Button */}
                            <button
                                onClick={() => {
                                    navigate("/dashboard/my-profile")
                                }}
                                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                            >
                                Cancel
                            </button>
                        </div>
                        <div>
                            <IconBtn text="save" onclick={() => {
                                dispatch(postUserdetails(formData, token, user))
                            }}></IconBtn>
                        </div>
                    </div>

                </div>
            </div>


            <UpdatePassword />


            <DeleteAccount />

        </div>
    )
}

export default Setting