import AdminUserCard from "@/components/cards/admin/AdminUserCard"
import { baseurl } from "@/utills/consant"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loading from "../loading"
export default function AdminUsers(prosp:{
    name:string
}) {
    const QueryUSer = useQuery({
        queryKey:["user",prosp.name],
        queryFn:async()=>{
            const response = await axios.post(`${baseurl}/user`,{
                email:prosp.name
            },{
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    })
    if(QueryUSer.isLoading){
        return<div className="w-full h-screen p-2 flex  justify-start  items-center pl-44 flex-col">
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
    if(QueryUSer.isError){
        return<div className="h-screen w-full flex flex-col justify-start items-center  pl-44 ">
            
            Error</div>
    }
    if(QueryUSer.data.data.length === 0){
        return<div className="h-screen w-full flex flex-col justify-start items-center  pl-44 ">
            
            No User</div>
    }
    if(QueryUSer.data.data.length>0){
        return <div className="h-screen w-full flex flex-col justify-start items-center  pl-44 ">
            <div className="grid grid-cols-4 gap-4 w-full px-5">
            {QueryUSer.data.data.map((user:any,index:number)=>{
                return <AdminUserCard id={user.id} email={user.email} role={user.role} name={user.username} key={index} />
            })}
            </div>
   
    </div>
}
}