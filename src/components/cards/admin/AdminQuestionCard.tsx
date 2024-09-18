import ConfirmAlert from "@/components/Alerts/ConfirmAlert"
import { Button } from "@/components/ui/button"
import { baseurl } from "@/utills/consant"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"

export default function AdminQuestionCard(props:{
    id:string,
    question:string,
    answer:string,
    image:string
}){
    const [open,setOpen] = useState(false)  
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
        
        <div className="pl-2">
        <p className=" truncate w-full text-ellipsis font-medium">{props.question}</p>
        <p className=" truncate w-full text-ellipsis">{props.answer}</p>
        </div>
        <div className="flex h-12 justify-around items-center w-full">
            <Button>View</Button>
            <Button variant={"secondary"}>Edit</Button>
            <Button onClick={()=>{
                setOpen(true) 
            }} variant={"destructive"}>Delete</Button>
            
        </div>
    </div>
}