import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo3.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"
function TimelineSection() {
  const timeline = [
    {
      Logo: Logo1,
      heading: "Leadership",
      Description: "Fully commited to the success company"
    },
    {
      Logo: Logo2,
      heading: "Responsibility",
      Description: "Students will always be our top priority."
    },
    {
      Logo: Logo3,
      heading: "Flexibility",
      Description: "The ability to switch is an important skill."
    },
    {
      Logo: Logo4,
      heading: "Solve the problem",
      Description: "Fully commited to the success company"
    }
  ]
  return (
    <div>
      <div className=' flex gap-15 items-center'>
        <div className='w-[45%] flex flex-col gap-5'>
          {
            timeline.map((element, index) => {
              return (
                <div className='flex flex-col'>
                  <div className='flex gap-6' key={index}>
                    <div className='w-[50px] h-[50px] bg-white flex items-center'>
                      <img src={element.Logo}></img>
                    </div>
                    <div>
                      <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                      <p className='text-base'>{element.Description}</p>
                    </div>
                  </div>
                  <div className='w-[5px] h-[5px] rounded-full bg-richblack-800 mt-2'></div>
                  <div className='w-[5px] h-[5px] rounded-full bg-richblack-800 mt-2'></div>
                  <div className='w-[5px] h-[5px] rounded-full bg-richblack-800 mt-2'></div>
                  <div className='w-[5px] h-[5px] rounded-full bg-richblack-800 mt-2'></div>
                  <div className='w-[5px] h-[5px] rounded-full bg-richblack-800 mt-2'></div>
                </div>
              )
            })
          }
        </div>

        <div className=' relative shadow-blue-200'>
          <img src={timelineImage} alt='timelineImage' className='shadow-white object-cover h-fit
            '></img>
          <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-10 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-7'>
              <p className='text-3xl font-bold'>10</p>
              <p className='text-caribbeangreen-300 text-sm'>Years of <br></br> Experience</p>
            </div>
            <div className='flex gap-5 items-center px-7'>
              <p className='text-3xl font-bold'>250</p>
              <p className='text-caribbeangreen-300 text-sm'>Type of <br></br> Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

//forntend-class-2 min done
export default TimelineSection