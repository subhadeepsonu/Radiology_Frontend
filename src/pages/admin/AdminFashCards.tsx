import CatgeoryDropDown from "@/components/Admin/CategoryDropDown"
import AdminFlashCards from "@/components/Admin/flashcard"
import SideBar from "@/components/Admin/sideBar"
import { useState } from "react"

export default function AdminFashCardsPage() {
    const [categoryid,setCat] = useState("")
    return <div>
        <SideBar />
        <div className="pl-48 flex justify-between items-center px-5 pt-20">
            <p className="font-medium text-xl">Flashcards</p>
            <CatgeoryDropDown setCat={setCat} />
        </div>
        <AdminFlashCards  categoryid={categoryid} />
    </div>

}