import React, { use, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { resetPassword } from "../services/operations/authAPI"
function UpdatePassword() {

    const location = useLocation();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })
    const { loading } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleOnChange = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const { password, confirmPassword } = formData
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    }
    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ? (
                    <div className='loader'></div>
                ) : (
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-white'>Choose new Password</h1>
                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password and youre all set.</p>
                        <form onSubmit={handleOnSubmit}>
                            <label className="relative">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">New Password<sup className="text-pink-200 ml-1 text-base">*</sup></p>

                                <input type={showPassword ? "text" : "password"} required name='password' value={password} onChange={handleOnChange} placeholder="Enter Password"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-white"></input>


                                <span onClick={() => {
                                    setShowPassword((prev) => !prev)
                                }} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                    {
                                        showPassword ? <AiFillEyeInvisible fontSize={24} fill="#AFB2BF"></AiFillEyeInvisible> : <AiFillEye fontSize={24} fill="#AFB2BF"></AiFillEye>
                                    }
                                </span>
                            </label>
                            <label className="relative mt-3 block">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">New confirm Password<sup className="text-pink-200 ml-1 text-base">*</sup></p>

                                <input type={showConfirmPassword ? "text" : "password"} required name='confirmPassword' value={confirmPassword} onChange={handleOnChange} placeholder="Confirm Password"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-white"></input>

                                <span onClick={() => {
                                    setShowConfirmPassword((prev) => !prev)
                                }} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                    {
                                        showConfirmPassword ? <AiFillEyeInvisible fontSize={24} fill="#AFB2BF"></AiFillEyeInvisible> : <AiFillEye fontSize={24} fill="#AFB2BF"></AiFillEye>
                                    }
                                </span>
                            </label>
                            <button type='submit'  className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">Reset Passowrd</button>
                        </form>
                        <div className="mt-6 flex items-center justify-between">
                            <Link to="/login">
                                <p className="flex items-center gap-x-2 text-white">
                                    <BiArrowBack /> Back To Login
                                </p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword