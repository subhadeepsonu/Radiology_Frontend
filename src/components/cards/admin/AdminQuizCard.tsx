
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ConfirmAlert from "@/components/Alerts/ConfirmAlert";
import FormPopUp from "@/components/Alerts/FormPopUp";
import EditQuizForm from "@/components/forms/EditQuiz";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseurl } from "@/utills/consant";
import { toast } from "sonner";
import EditQuiz from "@/components/forms/EditQuiz";

export default function AdminQuizCard(props:{
    id:string,
    title:string,
    categoryid:string,
    difficulty:string,
    image:string
}){
    const [open,setOpen]=useState(false)
    const [editopen,seteditopen] = useState(false)
    const queryClient = useQueryClient()
    const MutateDelete = useMutation({
        mutationFn:async()=>{
            const response = await axios.delete(`${baseurl}/quiz/delete/${props.id}`,{
                headers:{
                    Authorization: `${localStorage.getItem("token")}`
                }
            })
            return response.data
        },
        onSuccess:(data)=>{
            if(data.success){
                toast.success("Quiz Deleted Successfully")
                setOpen(false)
                queryClient.invalidateQueries({
                    queryKey:["quiz"]
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
    return <div className="h-32 rounded-lg w-80 bg-white border-2 border-gray-200">
        <ConfirmAlert loading={MutateDelete.isPending}  open={open} setopen={setOpen} text={"Do you want to delete this?"} function={()=>{
            MutateDelete.mutate()
        }} />
        <FormPopUp title="Edit Quiz card" form={<EditQuiz id={props.id} categoryid={props.categoryid} difficulty={props.difficulty as any} image={props.image} name={props.title} setOpen={seteditopen} />} open={editopen} setOpen={seteditopen} />
        
        <div className="flex flex-col justify-around items-center h-32" >
            <p className="text-start w-full px-2 font-medium ">{props.title}</p>
            <div className="w-full flex justify-around px-2 items-center">
            <Button  >view</Button>
                <Button onClick={()=>{
                    seteditopen(true)
                }} variant={"secondary"}>Edit</Button>
                <Button onClick={()=>{
                    setOpen(true)
                }} variant={"destructive"}>Delete</Button>
                <Link to={"quiz/2"}>
                
                </Link>
            </div>
        </div>
    </div>
}