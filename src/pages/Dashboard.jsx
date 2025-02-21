import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/core/Dashboard/Sidebar"
function Dashboard() {
    const {loading:authloading}=useSelector((state)=> state.auth);
    const {loading:profileloading}=useSelector((state)=> state.profile);

    if(authloading || profileloading){
        return (
            <div className='loader'></div>
        )
    }

  return (
    <div className=' relative h-full flex min-h-[calc(100vh-3.5rem)] '>
        <Sidebar></Sidebar>
        <div className="flex-1  overflow-y-auto">
    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      <Outlet />
    </div>
  </div>

    </div>
  )
}

export default Dashboard