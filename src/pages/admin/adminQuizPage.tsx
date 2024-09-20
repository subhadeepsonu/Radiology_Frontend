import SideBar from "@/components/Admin/sideBar"
import { useCallback, useState } from "react"
import CatgeoryDropDown from "@/components/Admin/CategoryDropDown"
import AdminQuizs from "@/components/Admin/Quizs"
import { Input } from "@/components/ui/input"
import debounce from "lodash.debounce"
import { Button } from "@/components/ui/button"
import FormPopUp from "@/components/Alerts/FormPopUp"
import AddQuiz from "@/components/forms/Addquiz"

export default function AdminQuizPage() {
        const [categoryid,setCat] = useState("")
        const [name,setName] = useState("")
        const [open, setOpen] = useState(false)
    const DebounceChange = useCallback(debounce((value)=>{
            setName(value)
    },500),[])
    return <div className="pt-20">
        <SideBar />
        <FormPopUp form={<AddQuiz setOpen={setOpen} />} open={open} setOpen={setOpen} title="Add Quiz" />
        <Button onClick={()=>{
          setOpen(true)      
        }} className="fixed right-5 bottom-5">Add Quiz</Button>
        <div className="pl-48  flex justify-between items-center px-5">
        <Input onChange={(e)=>{
                    DebounceChange(e.target.value)
            }} placeholder="Search" className="w-60" />
            <CatgeoryDropDown setCat={setCat} />
        </div>
        <AdminQuizs name={name} categoryid={categoryid} />
        </div>
}