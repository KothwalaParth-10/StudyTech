import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';

function Catalog() {
   const { catalogName } = useParams();
   const [catalogPageData, setCatalogPageData] = useState(null);
   const [categoryId, setCategoryId] = useState(null);

   //Fetch all catagories
   useEffect(() => {
      const getCategories = async () => {
         const res = await apiConnector("GET", categories.CATEGORIES_API);
         const category_id = res?.data?.allCategory?.filter((ct) => ct.name === catalogName)[0]._id;
         setCategoryId(category_id)
      }
      getCategories()
   }, [catalogName])

   useEffect(() => {
      const getCategoryDetails = async () => {
         try {

            const res = await getCatalogPageData(categoryId)
            setCatalogPageData(res)
            console.log("Printig CatalogPageData", catalogPageData);

         } catch (error) {
            console.log(error);
         }
      }
      if (categoryId) {
         getCategoryDetails()
      }
   }, [categoryId])

   return (
      <div className='text-white'>
         <div>
            <p>Home/Catalog/<span>{catalogPageData?.selectedCourses?.name}</span></p>
            <p>{catalogPageData?.selectedCourses?.name}</p>
            <p>{catalogPageData?.selectedCourses?.description }</p>
         </div>
         <div>
            {/* section-1 */}
            <div>
               <div className='flex gap-x-3'>
                  <p>Most Populer</p>
                  <p>New</p>
               </div>
                <div>
                <CourseSlider Courses={catalogPageData?.selectedCourses.course}></CourseSlider>
                </div> 
            </div>

            {/* section-2 */}
            <div>
               <p>Top Courses in {catalogPageData?.selectedCourses?.name}</p>
               <div>
               <CourseSlider Courses={catalogPageData?.differentCourses.course}></CourseSlider>
               </div>
            </div>

            {/* section-3 */}
            <div>
               <div>Frequently Bought</div>
               <div className='py-8'>
                      <div className='grid grid-cols-1 lg:grid-cols-2'>
                        {
                           catalogPageData?.mostSellingCourses?.slice(0,4).map((course,index)=>{
                              return <Course_Card key={index} course={course} Height={"h-[400px]"}></Course_Card>
                           })
                        } 
                      </div>
              </div>
            </div>

         </div>
         <Footer></Footer>
      </div>
   )
}

export default Catalog
//frontend 4 39:00 min done