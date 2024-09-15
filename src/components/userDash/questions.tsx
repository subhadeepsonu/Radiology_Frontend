import QuestionCard from "@/components/cards/question";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

  
  
export default function QuestionsPage(props:{
  id:String
}){
  const QueryQuestions =  useQuery({
    queryKey:["questionbycat"],
    queryFn:async ()=>{
      const response = await axios.get(`http://localhost:3000/questions/${props.id}`,{
        headers:{
          "Authorization":`${localStorage.getItem("token")}`
        }
      })
      console.log(response.data)
      return response.data
    }
  })
  if(QueryQuestions.isLoading){
    return <div className="min-h-screen w-full flex justify-center items-start py-10">
    <div className="flex flex-col w-full justify-center items-center">
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
    Loading...
</div>
        
    </div>
</div>
  }
  if(QueryQuestions.isError){
    <div className="min-h-screen w-full flex justify-center items-start py-10">
        <div className="flex flex-col w-full justify-center items-center">
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
           Error... 
        </div>
    </div>
  }
  if(QueryQuestions.data.data.length===0){
    return <div className="min-h-screen w-full flex justify-center items-start py-10">
        <div className="flex flex-col w-full justify-center items-center">
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
            Sorry we dont have any questions for this catgeory
        </div>
    </div>
  }
  if(QueryQuestions.data.data.length>0){
    return <div className="min-h-screen w-full flex justify-center items-start py-10">
    <div className="flex flex-col w-full justify-center items-center">
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
        {QueryQuestions.data.data.map((question:any)=>{
          return <QuestionCard id={question.id} image={question.image} key={question.id} category={question.category.name} difficulty={question.difficulty} question={question.question} />
        })}
    </div>
</div>
  }

}