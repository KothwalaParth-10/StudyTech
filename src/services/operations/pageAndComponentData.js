import React from 'react'
import {catalogData} from "../apis"
import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector'


const {CATALOGPAGEDATA_API}=catalogData


 export async function getCatalogPageData(categoryId) {
   const toastId=toast.loading("Loading")
   let result=[]
   try{
       
      const response=await apiConnector("POST",CATALOGPAGEDATA_API,{categoryId:categoryId});

      if(!response?.data?.success){
         throw new Error("Could not fetch Category page data")
      }
      result=response?.data
   }catch(error){
      console.log(error);
      toast.error(error);
      result=error.response?.data     
   }
   
   toast.dismiss(toastId);
   return result
}

