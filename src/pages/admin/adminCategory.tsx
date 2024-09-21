import SideBar from "@/components/Admin/sideBar"
import FormPopUp from "@/components/Alerts/FormPopUp"
import AdminCategoryCard from "@/components/cards/admin/AdminCategoryCard"
import AddCategory from "@/components/forms/AddCategory"
import Loading from "@/components/loading"
import { Button } from "@/components/ui/button"
import { baseurl } from "@/utills/consant"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

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
    const [open, setOpen] = useState(false)
    if(QueryCategory.isLoading){
        return <div className="w-full h-screen p-2 flex  justify-start  items-center pl-44 flex-col">
            <SideBar />
        <div className="grid grid-cols-4 gap-5 w-full px-5">
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
</div>
    </div>
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
                <FormPopUp open={open} setOpen={setOpen} title="Add Category" form={<AddCategory setOpen={setOpen} />} />
                <SideBar />
                <Button onClick={()=>{
                    setOpen(true)
                }} className="fixed right-5 bottom-5">Add Category</Button>
                <div className="w-full grid grid-cols-4 gap-5 px-5">
                    {QueryCategory.data.data.map((category:any,index:number)=>{
                        return <AdminCategoryCard key={index} id={category.id} name={category.name} />
                    })}
                    
                </div>
            </div>
        )
    }
   
}