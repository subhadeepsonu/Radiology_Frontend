import CatgeoryDropDown from "@/components/Admin/CategoryDropDown"
import AdminFlashCards from "@/components/Admin/flashcard"
import SideBar from "@/components/Admin/sideBar"
import { Input } from "@/components/ui/input"
import { useCallback,  useState } from "react"
import debounce from "lodash.debounce"
import { Button } from "@/components/ui/button"
import FormPopUp from "@/components/Alerts/FormPopUp"
import AddQuestionForm from "@/components/forms/AddQuestion"


export default function AdminFashCardsPage() {
    const [categoryid,setCat] = useState("")
    const [question,setquestion] = useState("")
    const [open, setOpen] = useState(false)
    const debouncedSetQuestion = useCallback(
        debounce((value) => {
            setquestion(value)
        }, 500),[])
    return <div>
        <SideBar />
        <FormPopUp form={<AddQuestionForm />} open={open} setOpen={setOpen} title="Add FlashCard" />
        <Button onClick={()=>{
            setOpen(true)
        }} className="fixed right-5 bottom-5">Add Flashcard</Button>
        <div className="pl-48 flex justify-between items-center px-5 pt-20">
        <Input onChange={(e)=>{
                debouncedSetQuestion(e.target.value)
            }} placeholder="Search" className="w-60" />
            <CatgeoryDropDown setCat={setCat} />
        </div>
        <AdminFlashCards question={question}  categoryid={categoryid} />
    </div>

}