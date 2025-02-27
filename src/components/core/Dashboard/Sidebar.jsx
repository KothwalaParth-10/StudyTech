import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'


function Sidebar() {
  const { user, loading: profileloading } = useSelector((state) => state.profile);
  const { loading: authloading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setconfirmationModal] = useState(null);


  if (authloading || profileloading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
      <div className="loader"></div>
    </div>
    )
  }


  return (
    <div>
      <div className='flex min-w-[222px] h-full flex-col border-r-[1px] border-r-richblack-700 s bg-richblack-800 py-10'>

        <div className='flex flex-col'>
          {
            sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) {
                return null;
              }
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon}></SidebarLink>
              )
            })
          }
        </div>
        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>
        <div className='flex flex-col'>
          <SidebarLink link={{ name: "Settings", path: "/dashboard/settings" }} iconName="VscSettingsGear"></SidebarLink>

          <button onClick={() => setconfirmationModal({
            text1: "Are You Sure ?",
            text2: "You will be logged out of your Account",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: () => dispatch(logout(navigate)),
            btn2Handler: () => setconfirmationModal(null)
          })} className="px-8 py-2 text-sm font-medium text-richblack-300">
            <div className='flex items-center gap-x-2'>
              <VscSignOut className='text-lg'></VscSignOut>
              <span>Logout</span>
            </div>

          </button>

        </div>

      </div>
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>
      }
    </div>
  )
}

export default Sidebar