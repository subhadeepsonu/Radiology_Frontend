import QuizCard from "@/components/cards/quizcard";
import UserSideBar from "@/components/userDash/userSideBard";
import { baseurl } from "@/utills/consant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function UserQuizPage() {
    const [category,setCategory] = useState("")
    const QueryQuiz = useQuery({
        queryKey:["quiz"],
        queryFn:async()=>{
            const response = await axios.get(`${baseurl}/quiz`,{
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    })
    if(QueryQuiz.isLoading){
        return <div className="h-screen w-full flex justify-center items-center">
            <UserSideBar />Loading...</div>
    }
    if(QueryQuiz.isError){
        return <div className="h-screen w-full flex justify-center items-center">
            <UserSideBar />Error</div>
    }
    if(QueryQuiz.data.data.length === 0){
        return <div className="h-screen w-full flex justify-center items-center">
            <UserSideBar />
            No Quiz</div>
    }
    if(QueryQuiz.data.data.length > 0){
        return <div className="flex justify-center items-start h-screen w-full pl-44 pt-20">
        <UserSideBar />
        <div className="grid grid-cols-4 gap-4 px-5">
        {QueryQuiz.data.data.map((quiz:any)=>{
            return <QuizCard questions={quiz._count.question} category={quiz.category.name} id={quiz.id} imgurl={quiz.image} title={quiz.name} key={quiz.id} />
        })}
        </div>
        </div>
    }
  
}