import { useQuery } from "@tanstack/react-query";
import AdminQuizCard from "../cards/admin/AdminQuizCard";
import axios from "axios";
import { baseurl } from "@/utills/consant";
import Loading from "../loading";
export default function AdminQuizs(props:{
    categoryid:string,
    name:string
}){
    const QueryCategory = useQuery({
        queryKey:["quiz",props.categoryid,props.name],
        queryFn:async()=>{
            const response = await axios.post(`${baseurl}/quiz/filter`,{
                categoryid:props.categoryid,
                name:props.name
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
        return <AdminQuizCard image={quiz.image} categoryid={quiz.categoryid} difficulty={quiz.difficulty} id={quiz.id}  title={quiz.name} />
    })}
    </div>
    </div>
}