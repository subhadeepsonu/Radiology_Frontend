import SideBar from "@/components/Admin/sideBar"
import CatgeoryDropDown from "@/components/Admin/CategoryDropDown"
import debounce from "lodash.debounce"
import { useCallback, useState } from "react"
import AdminQuestions from "@/components/Admin/questions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FormPopUp from "@/components/Alerts/FormPopUp"
import AddQuestionForm from "@/components/forms/AddQuestion"

export default function AdminQuestionPage(){
    const [categoryid,setCat] = useState("")
    const [name,setName] = useState("")
    const [open, setOpen] = useState(false)
    const DebounceChange = useCallback(debounce((value)=>{
            setName(value)
    },500),[])
   return <div className="pt-20">
         <SideBar />
         <FormPopUp form={<AddQuestionForm setOpen={setOpen} />} open={open} setOpen={setOpen} title="Add Question" />
         <Button onClick={()=>{
                   setOpen(true)
         }} className="fixed right-5 bottom-5">Add Question</Button>
         <div className="pl-48 flex justify-between items-center px-5">
         <Input onChange={(e)=>{
                    DebounceChange(e.target.value)
            }} placeholder="Search" className="w-60" />
         <CatgeoryDropDown setCat={setCat} />

         </div>
         <AdminQuestions question={name} categoryid={categoryid} />
   </div>
}