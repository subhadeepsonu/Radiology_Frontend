import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseurl } from "@/utills/consant";

import AdminQuestionCard from "../cards/admin/AdminQuestionCard";
export default function AdminQuestions(props:{
    categoryid:string
    
}) {
    const QueryQuestions = useQuery({
        queryKey:["questions",props.categoryid],
        queryFn:async()=>{
            const response = await axios.post(`${baseurl}/questions/filter`,{
                categoryid:props.categoryid
            },{
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    })
    if(QueryQuestions.isLoading){
        return  <div className="h-screen w-full flex justify-center items-center">
            Loading...</div>
    }
    if(QueryQuestions.isError){
        return  <div className="h-screen w-full flex justify-center items-center">
            Error...</div>
    }
    if(QueryQuestions.data.data.length === 0){
        return  <div className="h-screen w-full flex justify-center items-center">
            No questions</div>
    }
    if(QueryQuestions.data.data.length > 0){
        return <div className="w-full h-screen p-2 flex  justify-start  items-center pl-44 flex-col">
    <div className="grid grid-cols-4 gap-5 w-full px-5">
    {QueryQuestions.data.data.map((question:any)=>{
        return <AdminQuestionCard question={question.question} />
    })}
    </div>
    </div>
    }
    
}