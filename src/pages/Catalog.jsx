import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';

function Catalog() {
    const {catalogName}=useParams();
    const [catalogPageData,setCatalogPageData]=useState(null);
    const [categoryId,setCategoryId]=useState("");
  
  //Fetch all catagories
  useEffect(()=>{
       const getCategories=async () =>{
          const res=await apiConnector("GET",categories.CATEGORIES_API);    
          const category_id=res?.data?.allCategory?.filter((ct)=>ct.name === catalogName)[0]._id;  
          setCategoryId(category_id)         
       }
       getCategories()
  },[catalogName])

  useEffect(()=>{
       const getCategoryDetails=async()=>{
          try{
            
            const res=await getCatalogPageData(categoryId)
            console.log();
            
        //     setCatalogPageData(res)
        //    console.log("Printig CatalogPageData",res);
           
          }catch(error){
             console.log(error);              
          }
       }
       if(categoryId){
        getCategoryDetails()
       }
  },[categoryId])

  return (
    <div className='text-white'>
           <div>
              <p></p>
              <p></p>
              <p></p>
           </div>
           <div>
              {/* section-1 */}
              <div>
                 <div className='flex gap-x-3'>
                    <p>Most Populer</p>
                    <p>New</p>
                 </div>
                 {/* <CourseSlider></CourseSlider> */}
              </div>

               {/* section-2 */}
               <div>
                 <p>Top Courses</p>
                 <div>
                    {/* <CourseSlider></CourseSlider> */}
                 </div>
               </div>

                 {/* section-3 */}
                 <div>
                 <p>Frequently Bought Together</p>
                
               </div>

           </div>
           <Footer></Footer>
    </div>
  )
}

export default Catalog
//frontend 4 39:00 min done