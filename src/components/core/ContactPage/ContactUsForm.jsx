import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from "../../../services/apiconnector"
import toast from "react-hot-toast"
import { contactusEndpoint } from "../../../services/apis"
import CountryCode from "../../../data/countrycode.json"
import "../ContactPage/ContactForm.css"

function ContactUsForm() { 
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("Data:", data);
        const toastId = toast.loading("Loading..."); 
        try {
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            console.log("response:", response);
            if(!response.data.success){
                throw new Error(response.data.message);
              }
            toast.success("data Submited SuccessFully",{id:toastId});
        } catch (error) {
            console.log("Error:", error);
            toast.error("Error while Submiting data",{ id: toastId })
        }


    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: ""
            })
        }

    }, [isSubmitSuccessful, reset])
    return (
        <form className='flex flex-col gap-7' onSubmit={handleSubmit(submitContactForm)}>
            <div   className='flex flex-col gap-5 lg:flex-row'>
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label className='text-sm' htmlFor='firstname'>First Name <sup className="text-pink-200">*</sup></label>
                    <input
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                         className='text-black form-style'
                        {...register("firstname", { required: true })}
                    ></input>
                    {
                        errors.firstname && (
                            <span  className="text-[#FF3131]">Please enter Your name</span>
                        )
                    }
                </div>
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label className='text-sm' htmlFor='lastname'>last Name</label>
                    <input
                        type='text'
                        name='lastname'
                        id='lastname'
                        placeholder='Enter Last name'
                         className='text-black form-style'
                        {...register("lastname")}
                        
                    ></input>

                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className=' text-sm'>Email Address <sup className="text-pink-200">*</sup></label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Enter Email Address'
                    {...register("email", { required: true })}
                     className='text-black form-style'
                ></input>
                {
                    errors.email && (
                        <span  className="text-[#FF3131]">
                            Please enter your email Address
                        </span>
                    )
                }
            </div>

            <div className='flex flex-col gap-2'>
                <label  className='text-sm' htmlFor='phonenumber'>Phone Number <sup className="text-pink-200">*</sup></label>

                <div className='flex gap-5'>
                    <div  className='flex w-[81px] flex-col gap-2'>
                        <select
                            name='dropdown'
                            id='dropdown'
                            {...register("countrycode", { required: true })}
                            defaultValue="+91"  className='form-style'>
                            {
                                CountryCode.map((element, index) => {
                                    return (
                                        <option key={index} value={element.code} className='text-black'>
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className='flex w-[calc(100%-90px)] flex-col gap-2'>
                        <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                              className='form-style'
                            {...register("phoneNo", {
                                required: { value: true, message: "Please enter Phone Number" },
                                maxLength: { value: 10, message: "Invalid Phone Number" },
                                minLength: { value: 8, message: "Invalid Phone Number" }
                            })}
                        ></input>
                    </div>
                </div>
                {
                    errors.phoneNo && (
                        <span  className="text-[#FF3131]">{errors.phoneNo.message}</span>
                    )
                }

            </div>

            <div className='flex flex-col gap-2'>
                <label className='text-sm' htmlFor='message'>Message <sup className="text-pink-200">*</sup></label>
                <textarea
                    id='message'
                    name='message'
                    cols="30"
                    rows="7"
                      className='form-style'
                    placeholder='Enter Your message here'
                    {...register("message", { required: true })}
                ></textarea>
                {
                    errors.message && (
                        <span  className="text-[#FF3131]">
                            Please enter your message
                        </span>
                    )
                }
            </div>
            <button type='submit'
            className='rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         transition-all duration-200 hover:scale-95 hover:shadow-none  disabled:bg-richblack-500 sm:text-[16px] '>
                    Send Message
            </button>
        </form>
    )
}
//frontend-class 6  done
export default ContactUsForm