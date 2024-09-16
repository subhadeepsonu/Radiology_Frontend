import { baseurl } from "@/utills/consant"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import AdminFlashCard from "../cards/admin/AdminFlashCard"

export default function AdminFlashCards(props:{
    categoryid:string
}){
    const QueryFlashcards = useQuery({
        queryKey:["flashcards",props.categoryid],
        queryFn:async()=>{
            const response = await axios.post(`${baseurl}/flashcards/filter`,{
                categoryid:props.categoryid
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
    <div className="grid grid-cols-4 gap-5 w-full px-5">
    {QueryFlashcards.data.data.map((flashcard:any)=>{
        return <AdminFlashCard question={flashcard.question} />
    })}
    </div>
    </div>
}