import CatgeoryDropDown from "@/components/Admin/CategoryDropDown"
import SideBar from "@/components/Admin/sideBar"
import AdminFlashCard from "@/components/cards/admin/AdminFlashCard"
import { baseurl } from "@/utills/consant"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

export default function AdminFashCardsPage() {
    const [categoryid,setCat] = useState("")
    const [name,setName] = useState("")
    const QueryFlashCard = useQuery({
        queryKey:["flashcards",categoryid,name],
        queryFn:async()=>{
            const response = await axios.post(`${baseurl}/flashcards/filter`,
                {
                    categoryid
                },
                {
                
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    })
    if(QueryFlashCard.isLoading){
        return  <div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <SideBar />
            <div className="w-full h-fit py-2  flex justify-between items-center px-5">
                <p className="font-medium text-2xl">FlashCards</p>
                <CatgeoryDropDown setCat={setCat} />
            </div>
            Loading...</div>
    }
    if(QueryFlashCard.isError){
        return  <div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <SideBar />
            <div className="w-full h-fit py-2  flex justify-between items-center px-5">
                <p className="font-medium text-2xl">FlashCards</p>
                <CatgeoryDropDown setCat={setCat} />
            </div>
            Error</div>
    }
    if(QueryFlashCard.data.data.length === 0){
        return <div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <SideBar />
            <div className="w-full h-fit py-2  flex justify-between items-center px-5">
                <p className="font-medium text-2xl">FlashCards</p>
                <CatgeoryDropDown setCat={setCat} />
            </div>
            No Flash Cards</div>
    }
    if(QueryFlashCard.data.data.length > 0){
        return <div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <SideBar />
            <div className="w-full h-fit py-2  flex justify-between items-center px-5">
                <p className="font-medium text-2xl">FlashCards</p>
                <CatgeoryDropDown setCat={setCat} />
            </div>
            
            <div className="grid grid-cols-4 gap-5 w-full px-5">
                {QueryFlashCard.data.data.map((flashCard:any)=>{
                    return <AdminFlashCard question={flashCard.question} />
                })}
            </div>
        </div>
    }

}