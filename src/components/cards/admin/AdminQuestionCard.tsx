import ConfirmAlert from "@/components/Alerts/ConfirmAlert"
import FormPopUp from "@/components/Alerts/FormPopUp"
import EditQuestionForm from "@/components/forms/EditQuestion"
import { Button } from "@/components/ui/button"
import { baseurl } from "@/utills/consant"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"
import AdminQuestionPopUp from "./AdminQuestionPopup"

export default function AdminQuestionCard(props:{
    id:string,
    question:string,
    answer:string,
    image:string,
    categoryid:string,
    difficulty:string,
    keyword1:string,
    keyword2:string,
    keyword3:string,
    description:string
}){
    const [open,setOpen] = useState(false)  
    const [editopen,SetEditOpen] = useState(false)
    const [viewopen,setViewOpen] = useState(false)
    const QueryClient = useQueryClient()
    const MutateDelete = useMutation({
        mutationFn:async()=>{
            const response = await axios.delete(`${baseurl}/questions/delete/${props.id}`,{
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                }
            })
            return response.data
        },
        onSuccess:(data)=>{
            if(data.success){
                toast.success("Question Deleted")
                setOpen(false)
                QueryClient.invalidateQueries({
                    queryKey:["questions"]
                })
                
            }
            else{
                toast.error("Something went wrong")
            }
        },
        onError:()=>{
            toast.error("Something went wrong")
        }
    })  
    return <div className="h-32 border-2 border-gray-200 rounded-lg w-full flex flex-col justify-around items-start ">
        <ConfirmAlert loading={MutateDelete.isPending} open={open} setopen={setOpen} text={"Are you Sure ?"} function={()=>{
                    MutateDelete.mutate()
                    }}  /> 
        <FormPopUp open={viewopen} setOpen={setViewOpen} title="Question" form={<AdminQuestionPopUp answer={props.answer} description={props.description} difficulty={props.difficulty} keyword1={props.keyword1} keyword2={props.keyword2} keyword3={props.keyword3} question={props.question}/>} />
        <FormPopUp open={editopen} setOpen={SetEditOpen} title="Edit Question" form={<EditQuestionForm setOpen={SetEditOpen} answer={props.answer} categoryid={props.categoryid} description={props.description} difficulty={props.difficulty as any} id={props.id} image={props.image} keyword1={props.keyword1} question={props.question} keyword2={props.keyword2} keyword3={props.keyword3} />} />
        <div className="pl-2">
        <p className=" truncate w-full text-ellipsis font-medium">{props.question}</p>
        <p className=" truncate w-full text-ellipsis">{props.answer}</p>
        </div>
        <div className="flex h-12 justify-around items-center w-full">
            <Button onClick={()=>{
                setViewOpen(true)
            }}>View</Button>
            <Button onClick={()=>{
                SetEditOpen(true)
            }} variant={"secondary"}>Edit</Button>
            <Button onClick={()=>{
                setOpen(true) 
            }} variant={"destructive"}>Delete</Button>
            
        </div>
    </div>
}