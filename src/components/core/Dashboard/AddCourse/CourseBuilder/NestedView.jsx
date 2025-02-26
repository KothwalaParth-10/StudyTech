import React, { useState } from 'react'
import { BiDownArrow } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'

function NestedView({hendleChangeEditSectionName}) {

    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setaddSubSection] = useState(null);
    const [editSubSection, seteditSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);

   const [confirmationModal, setconfirmationModal] = useState(null);
   const handleDeleteSection=(sectionId)=>{

   } 

    return (
        <div>

            <div className='rounded-lg bg-richblack-700 p-6 px-8'>
                {course?.courseContent?.map((section) => {
                    return (
                        <details key={section._id} open>
                               <summary className='flex items-center justify-center gap-x-3 border-b-2'>
                                <div>
                                    <RxDropdownMenu></RxDropdownMenu>
                                    <p>{section.sectionName}</p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <button onClick={hendleChangeEditSectionName(section._id,section.sectionName)}>
                                        <MdEdit></MdEdit>
                                    </button>
                                    <button onClick={()=>{
                                        setconfirmationModal({
                                            text1:"Delete this Section",
                                            text2:"All the lectures in this section will be deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler:()=> handleDeleteSection(section._id),
                                            btn2Handler:()=>setconfirmationModal(null)
                                        })
                                    }}>
                                        <RiDeleteBin6Line></RiDeleteBin6Line>
                                    </button>
                                    <span>|</span>
                                    <BiDownArrow className='text-xl text-richblack-300'></BiDownArrow>
                                </div>
                               </summary>
                        </details>
                    )
                })

                }
            </div>

        </div>
    )
}
// 102 Edtech forntend 2 1:15:00 done
export default NestedView