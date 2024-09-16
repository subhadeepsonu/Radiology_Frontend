import SideBar from "@/components/Admin/sideBar"
import CatgeoryDropDown from "@/components/Admin/CategoryDropDown"

import { useState } from "react"
import AdminQuestions from "@/components/Admin/questions"
export default function AdminQuestionPage(){
    const [categoryid,setCat] = useState("")
   return <div className="pt-20">
         <SideBar />
         <div className="pl-48 flex justify-between items-center px-5">
         <p className="font-medium text-xl">Questions</p>
         <CatgeoryDropDown setCat={setCat} />
         </div>
         <AdminQuestions categoryid={categoryid} />
   </div>
}