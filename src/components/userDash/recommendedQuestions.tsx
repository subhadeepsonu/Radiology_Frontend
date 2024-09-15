import QuizCard from "@/components/cards/quizcard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function RecommendedQuizs(){
    const data = useQuery({
        queryKey:["recommendedQuizs"],
        queryFn:async()=>{
            const response = await axios.get("http://localhost:3000/quiz/popular",
                {
                    headers:{
                        "Authorization":`${localStorage.getItem("token")}`
                    }
                }
            )
            return response.data
        }
    })
    if(data.isLoading){
        return <div className="w-full min-h-[500px] flex justify-center items-center">Loading...</div>
    } 
    if(data.isError){
        return <div className="w-full min-h-[500px] flex justify-center items-center">Error...</div>
    }
    if(data.data.data.length === 0){
        return <div className="w-full min-h-[500px] p-5 flex flex-col justify-around items-center ">
        <p className="text-start w-full pl-20 text-4xl font-bold">Recommended Quizes</p>
        <div className="w-full flex justify-center items-center">
            No Quizes Found
        </div>
    </div>
        
    }
    if(data.data.data.length > 0){
    return <div className="w-full min-h-[500px] p-5 flex flex-col justify-around items-center ">
        <p className="text-start w-full pl-20 text-4xl font-bold">Recommended Quizes</p>
        <div className="w-full flex justify-center items-center">
            <div className="grid grid-cols-4 gap-5">
                {data.data.data.map((quiz:any)=>{
                    return <QuizCard id={quiz.id} imgurl={quiz.image} title={quiz.name}></QuizCard>
                })}
            </div>
        </div>
    </div>
}
}