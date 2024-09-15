import QuizCard from "@/components/cards/quizcard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function MoreQuizs(){
    const QueryQuiz = useQuery({
        queryKey:["moreQuizs"],
        queryFn:async()=>{
            const response = await axios.get("http://localhost:3000/quiz",
                {
                    headers:{
                        "Authorization":`${localStorage.getItem("token")}`
                    }
                }
            )
            return response.data
        }
    })
    if(QueryQuiz.isLoading){
        return <div className="w-full min-h-[500px] flex justify-center items-center">Loading...</div>
    }
    if(QueryQuiz.isError){
        return <div className="w-full min-h-[500px] flex justify-center items-center">Error...</div>
    }
    if(QueryQuiz.data.data.length===0){
        return <div className="w-full min-h-[500px] p-5 flex flex-col justify-around items-center ">
        <p className="text-start w-full pl-20 text-4xl font-bold">More Quizes</p>
        <div className="w-full flex justify-center items-center">
            NO Quiz found ...

        </div>
    </div>
    }
    if(QueryQuiz.data.data.length>0){
        return <div className="w-full min-h-[500px] p-5 flex flex-col justify-around items-center ">
        <p className="text-start w-full pl-20 text-4xl font-bold">More Quizes</p>
        <div className="w-full flex justify-center items-center">
            <div className="grid grid-cols-4 gap-5">
                {QueryQuiz.data.data.map((quiz:any)=>{
                    return <QuizCard id={quiz.id} imgurl={quiz.image} title={quiz.name}></QuizCard>
                })}
            </div>

        </div>
    </div>
    }
   
}