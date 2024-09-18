import { baseurl } from "@/utills/consant"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import AdminFlashCard from "../cards/admin/AdminFlashCard"

export default function AdminFlashCards(props:{
    categoryid:string,
    question:string
}){
    const QueryFlashcards = useQuery({
        queryKey:["flashcards",props.categoryid,props.question],
        queryFn:async()=>{
            console.log("flashcards")
            const response = await axios.post(`${baseurl}/flashcards/filter`,{
                categoryid:props.categoryid,
                question:props.question
            },{
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    })
    if(QueryFlashcards.isLoading){
        return <div className="w-full h-screen p-2 flex  justify-start  items-center pl-44 pt-20 flex-col">
            Loading...
        </div>
    }
    if(QueryFlashcards.isError){
        return <div className="w-full h-screen p-2 flex  justify-start  items-center pl-44 pt-20 flex-col">
            Error
        </div>
    }
    if(QueryFlashcards.data.data.length === 0){
        return <div className="w-full h-screen p-2 flex  justify-start  items-center pl-44 pt-20 flex-col">
            No Flashcards
        </div>
    }
    return <div className="w-full h-screen p-2 flex  justify-start  items-center pl-44  flex-col">
    <div className="grid grid-cols-5 gap-5 w-full px-5">
    {QueryFlashcards.data.data.map((flashcard:any)=>{
        return <AdminFlashCard id={flashcard.id} answer={flashcard.answer} question={flashcard.question} />
    })}
    </div>
    </div>
}