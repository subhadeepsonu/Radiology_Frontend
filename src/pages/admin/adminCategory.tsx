import CatgeoryDropDown from "@/components/Admin/CategoryDropDown"
import SideBar from "@/components/Admin/sideBar"
import AdminCategoryCard from "@/components/cards/admin/AdminCategoryCard"
import { baseurl } from "@/utills/consant"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function AdminCategoryPage() {
    const QueryCategory = useQuery({
        queryKey:["category"],
        queryFn:async()=>{
            const response = await axios.get(`${baseurl}/category`,{
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    })
    if(QueryCategory.isLoading){
        return <div className="h-screen w-full flex justify-center items-center">
            <SideBar />Loading...</div>
    }
    if(QueryCategory.isError){
        return <div className="h-screen w-full flex justify-center items-center">
            <SideBar />Error</div>
    }
    if(QueryCategory.data.data.length === 0){
        return <div className="h-screen w-full flex justify-center items-center">
            <SideBar />
            No Category</div>
    }
    if(QueryCategory.data.data.length > 0){
        return (
            <div className="h-screen w-full flex justify-center  items-start pl-44 pt-20">
                <SideBar />
                <div className="w-full grid grid-cols-4 gap-5 px-5">
                    {QueryCategory.data.data.map((category:any)=>{
                        return <AdminCategoryCard name={category.name} />
                    })}
                    
                </div>
            </div>
        )
    }
   
}