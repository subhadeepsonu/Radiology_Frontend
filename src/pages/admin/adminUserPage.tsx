import SideBar from "@/components/Admin/sideBar"
import AdminUserCard from "@/components/cards/admin/AdminUserCard"
import { baseurl } from "@/utills/consant"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function AdminUserPage() {
    
    const QueryUSer = useQuery({
        queryKey:["user"],
        queryFn:async()=>{
            const response = await axios.get(`${baseurl}/user`,{
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    })
    if(QueryUSer.isLoading){
        return<div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <SideBar />
            Loading...</div>
    }
    if(QueryUSer.isError){
        return<div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <SideBar />
            Error</div>
    }
    if(QueryUSer.data.data.length === 0){
        return<div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <SideBar />
            No User</div>
    }
    if(QueryUSer.data.data.length>0){
        return <div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <SideBar />
            <div className="grid grid-cols-4 gap-4 w-full px-5">
            {QueryUSer.data.data.map((user:any)=>{
                return <AdminUserCard name={user.username} />
            })}
            </div>
   
    </div>
}
}