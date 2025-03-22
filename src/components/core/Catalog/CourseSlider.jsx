import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {Autoplay, Pagination, Navigation } from "swiper/modules"
import Course_Card from './Course_Card'

function CourseSlider({Courses}) {
  return (
    <>
       {
          Courses?.length?(
            <Swiper  spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]} breakpoints={{
              320: { // ✅ Fixed syntax
                slidesPerView: 2,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}>
               {
                Courses.map((course,index)=>{
                   return <SwiperSlide key={index}>
                    <Course_Card course={course} Height={"h-[250px]"}></Course_Card>
                   </SwiperSlide>
                })
               }
            </Swiper>
          ):(
            <p>No Course Found</p>
          )
       }
    </>
  )
}

export default CourseSlider
// frontendclass-4 done