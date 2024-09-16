import SideBar from "@/components/Admin/sideBar"
import { useState } from "react"
import CatgeoryDropDown from "@/components/Admin/CategoryDropDown"
import AdminQuizs from "@/components/Admin/Quizs"
export default function AdminQuizPage() {
    const [categoryid,setCat] = useState("")
    return <div className="pt-20">
        <SideBar />
        <div className="pl-48  flex justify-between items-center px-5">
        <p className="font-medium text-xl">Quizs</p>
            <CatgeoryDropDown setCat={setCat} />
        </div>
        <AdminQuizs categoryid={categoryid} />
        </div>
}