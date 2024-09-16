import SideBar from "@/components/Admin/sideBar"
import AdminQuestionCard from "@/components/cards/admin/AdminQuestionCard"
import CatgeoryDropDown from "@/components/Admin/CategoryDropDown"
import { baseurl } from "@/utills/consant"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
export default function AdminQuestionPage(){
    const [categoryid,setCat] = useState("")
    const QueryQuestions = useQuery({
        queryKey:["questions",categoryid],
        queryFn:async()=>{
            const response = await axios.post(`${baseurl}/questions/filter`,{
                categoryid
            },{
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    })
    if(QueryQuestions.isLoading){
        return <div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <div className="w-full h-fit py-2  flex justify-between items-center px-5">
                <p className="font-medium text-2xl">Questions</p>
                <CatgeoryDropDown setCat={setCat} />
            </div>
            <SideBar />Loading...</div>
    }
    if(QueryQuestions.isError){
        return <div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <div className="w-full h-fit py-2  flex justify-between items-center px-5">
                <p className="font-medium text-2xl">Questions</p>
                <CatgeoryDropDown setCat={setCat} />
            </div>
            <SideBar />Error</div>
    }
    if(QueryQuestions.data.data.length === 0){
        return <div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <div className="w-full h-fit py-2  flex justify-between items-center px-5">
                <p className="font-medium text-2xl">Questions</p>
                <CatgeoryDropDown setCat={setCat} />
            </div>
            <SideBar />
            No Questions</div>
    }
    if(QueryQuestions.data.data.length > 0){
        return <div className="h-screen w-full flex flex-col justify-start items-center  pl-44 pt-20">
            <SideBar />
            <div className="w-full h-fit py-2  flex justify-between items-center px-5">
                <p className="font-medium text-2xl">Questions</p>
                <CatgeoryDropDown setCat={setCat} />
            </div>
            <div className="grid grid-cols-4 px-5 gap-5 w-full">
                {QueryQuestions.data.data.map((question:any)=>{
                    return <AdminQuestionCard question={question.question} />
                })}
            </div>
        </div>
    }
}