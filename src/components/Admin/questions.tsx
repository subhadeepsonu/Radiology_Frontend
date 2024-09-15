import { useQuery } from "@tanstack/react-query";
import QuestionCard from "../cards/question";
import axios from "axios";
export default function Questions() {
    const QueryQuestions = useQuery({
        queryKey:["questions"],
        queryFn:async ()=>{
            const response = await axios.get("http://localhost:3000/questions",{
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    })
    if(QueryQuestions.isLoading){
        return <div>Loading...</div>
    }
    if(QueryQuestions.isError){
        return <div>Error...</div>
    }
    if(QueryQuestions.data.data.length === 0){
        return <div>No questions</div>
    }
    if(QueryQuestions.data.data.length > 0){
        return <div className="w-full h-fit p-2 flex justify-center  items-start pl-20  flex-col">
    <p className="my-2 text-3xl font-medium">Categories</p>
    {QueryQuestions.data.data.map((question:any)=>{
        return <QuestionCard key={question.id} question={question.question} id={question.id} category={question.category.name} difficulty={question.difficulty} image={question.image} />

    })}
    </div>
    }
    
}