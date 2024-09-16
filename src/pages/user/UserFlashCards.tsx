import UserSideBar from "@/components/userDash/userSideBard";
import { useState } from "react";

export default function UserFlashCardsPage() {
    const [category,setCategory] = useState("")
    return <div className="flex justify-center items-center h-screen w-full">
        <UserSideBar />
        flashcards</div>
}