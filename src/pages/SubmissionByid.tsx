import SubmissionCard from "@/components/cards/submission";
import UserContext from "@/context/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
export default function SubmissionByID() {
    const auth = useContext(UserContext)
    const QuerySubmissions = useQuery({
        queryKey:["submissions"],
        queryFn:async()=>{
            const response = await axios.get(`http://localhost:3000/submissions/:${auth.user.id}`,{
                headers:{
                    Authorization: `${localStorage.getItem("token")}`
                }
            })
            return response.data
        },
    })
    if(QuerySubmissions.isLoading){
        return <div className="w-full min-h-screen flex flex-col justify-center items-center py-28">
            Loading...</div>
    }
    if(QuerySubmissions.isError){
        return <div className="w-full min-h-screen flex flex-col justify-center items-center py-28">
            Error...</div>
    }
    if(QuerySubmissions.data.data.length===0){
        return <div className="w-full min-h-screen flex flex-col justify-center items-center py-28">
            You have not Attempted this quiz before
            </div>
    }
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center py-28">
        <div className="w-11/12 flex justify-between items-center h-20 ">
        <p className="font-medium text-2xl">Your Submissions</p>
        <p>filter</p>
        </div>
        <div className="grid grid-cols-4 gap-5">
            {QuerySubmissions.data.data.map((submission:any)=>{
                return <SubmissionCard key={submission.id} date={submission.date} score={submission.score} title={submission.title}></SubmissionCard>
            })}
        </div>
</div>
    )
}