import SideBar from "@/components/Admin/sideBar"
import AdminQuizCard from "@/components/cards/admin/AdminQuizCard"
import { baseurl } from "@/utills/consant"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import CatgeoryDropDown from "@/components/Admin/CategoryDropDown"
export default function AdminQuizPage() {
    const [categoryid,setCat] = useState("")
    const QueryQuiz = useQuery({
        queryKey:["quiz",categoryid],
        queryFn:async ()=>{
            const response = await axios.post(`${baseurl}/quiz/filter`,{
                categoryid
            },{
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    })
    if(QueryQuiz.isLoading){
        return <div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <div className="w-full h-fit py-2  flex justify-between items-center px-5">
                <p className="font-medium text-2xl">FlashCards</p>
                <CatgeoryDropDown setCat={setCat} />
            </div>
            <SideBar />Loading...</div>
    }
    if(QueryQuiz.isError){
        return <div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <div className="w-full h-fit py-2  flex justify-between items-center px-5">
                <p className="font-medium text-2xl">FlashCards</p>
                <CatgeoryDropDown setCat={setCat} />
            </div>
            <SideBar />Error</div>
    }
    if(QueryQuiz.data.data.length === 0){
        return <div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <div className="w-full h-fit py-2  flex justify-between items-center px-5">
                <p className="font-medium text-2xl">FlashCards</p>
                <CatgeoryDropDown setCat={setCat} />
            </div>
            <SideBar />
            No Quiz</div>
    }
    if(QueryQuiz.data.data.length > 0){
        return <div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
        <SideBar />
        <div className="w-full h-fit py-2  flex justify-between items-center px-5">
                <p className="font-medium text-2xl">FlashCards</p>
                <CatgeoryDropDown setCat={setCat} />
            </div>
        <div className="grid grid-cols-4 gap-4 px-5 w-full">
        {QueryQuiz.data.data.map((quiz:any)=>{
            return <AdminQuizCard imgurl={quiz.image} title={quiz.name}  />
        })}
        </div>
        </div>
    }
}