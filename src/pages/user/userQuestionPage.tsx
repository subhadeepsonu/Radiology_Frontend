import QuestionCard from "@/components/cards/question";
import UserSideBar from "@/components/userDash/userSideBard";
import { baseurl } from "@/utills/consant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function UserQuestionPage() {
    const [category,setCategory] = useState("")
    const QueryQuestion = useQuery({
        queryKey:["question"],
        queryFn:async ()=>{
            const response = await axios.get(`${baseurl}/questions`,{
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    })
    if(QueryQuestion.isLoading){
        return <div className="h-screen w-full flex justify-center items-center">
            <UserSideBar />Loading...</div>
    }
    if(QueryQuestion.isError){
        return <div className="h-screen w-full flex justify-center items-center">
            <UserSideBar />Error</div>
    }
    if(QueryQuestion.data.data.length === 0){
        return <div className="h-screen w-full flex justify-center items-center">
            <UserSideBar />
            No Question</div>
    }
    if(QueryQuestion.data.data.length > 0){
        return <div className="flex justify-start items-center pt-20 h-screen w-full flex-col pl-40">
        <UserSideBar />
        <div className="w-10/12 h-12 border-b-2 border-gray-100 flex justify-between items-center">
            <div className="w-1/2 font-semibold text-xl">
                Question
            </div>
            <div className="w-1/6 font-semibold text-xl">
                Category
            </div>
            <div className={`w-1/6 font-semibold text-xl`}>
                Difficulty
            </div>
            <div className="w-14">

            </div>
        </div>
        {QueryQuestion.data.data.map((question:any)=>{
            return <QuestionCard id={question.id} question={question.question} category={question.category.name} difficulty={question.difficulty} image={question.image} key={question.id} />
        })}
        
        
        </div>
    }

}