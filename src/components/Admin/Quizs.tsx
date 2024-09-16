import { useQuery } from "@tanstack/react-query";
import AdminQuizCard from "../cards/admin/AdminQuizCard";
import axios from "axios";
import { baseurl } from "@/utills/consant";
export default function AdminQuizs(props:{
    categoryid:string
}){
    const QueryCategory = useQuery({
        queryKey:["category",props.categoryid],
        queryFn:async()=>{
            const response = await axios.post(`${baseurl}/quiz/filter`,{
                categoryid:props.categoryid
            }
            ,{
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    })
    if(QueryCategory.isLoading){
        return <div className="w-full h-screen p-2 flex  justify-start  items-center pl-44 flex-col">
            Loading...
        </div>
    }
    if(QueryCategory.isError){
        return <div className="w-full h-screen p-2 flex  justify-start  items-center pl-44 flex-col">
       Error
        </div>
    }
    if(QueryCategory.data.data.length === 0){
        return <div className="w-full h-screen p-2 flex  justify-start  items-center pl-44 flex-col">
            No Quiz
        </div>
    }
    return <div className="w-full h-screen p-2 flex  justify-start  items-center pl-44 flex-col">
    <div className="grid grid-cols-4 gap-5 w-full px-5">
    {QueryCategory.data.data.map((quiz:any)=>{
        return <AdminQuizCard imgurl={quiz.image} title={quiz.name} />
    })}
    </div>
    </div>
}