import ConfirmAlert from "@/components/Alerts/ConfirmAlert";
import FormPopUp from "@/components/Alerts/FormPopUp";
import EditFlashCardFrom from "@/components/forms/EditFlashCard";
import { Button } from "@/components/ui/button";
import { baseurl } from "@/utills/consant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import AdminFlashCardPopUp from "./AdminFlashCardPopUp";

export default function AdminFlashCard(props:{
    id:string,
    question:string,
    answer:string,
    categoryid:string,
    description:string
}){
    const [open,setOpen] = useState(false)
    const [editopen,SetEditOpen] = useState(false)
    const [viewopen,setViewOpen] = useState(false)
    const queryClient = useQueryClient()
    const MutateDelete = useMutation({
        mutationFn:async ()=>{
            const responce = await axios.delete(`${baseurl}/flashcards/delete/${props.id}`,{
                headers:{
                    Authorization: `${localStorage.getItem("token")}`
                }
            })
            return responce.data
        },
        onSuccess:(data)=>{
            if(data.success){
                toast.success("FlashCard Deleted Successfully")
                setOpen(false)
                queryClient.invalidateQueries({
                    queryKey:["flashcards"]
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
    return <div className="h-32 border-2 border-gray-200 rounded-lg w-full flex flex-col justify-around items-start pl-2">
        <ConfirmAlert open={open} setopen={setOpen} text={"Are you sure ?"} loading={MutateDelete.isPending} function={()=>{
            MutateDelete.mutate()
        }} />
        <FormPopUp open={viewopen} setOpen={setViewOpen} title="FlashCard" form={<AdminFlashCardPopUp answer={props.answer} description={props.description} question={props.question} />} />
        <FormPopUp open={editopen} setOpen={SetEditOpen} title="Edit Flashcard" form={<EditFlashCardFrom  answer={props.answer} categoryid={props.categoryid} description={props.description} id={props.id} question={props.question} setOpen={SetEditOpen}  />} />
        <div className="flex flex-col justify-around items-start w-full">
        <p className="truncate text-ellipsis w-full font-medium">{props.question}</p>
        <p className="truncate text-ellipsis w-full">{props.answer}</p>
        </div>
        <div className="w-full flex justify-around items-center">
        <Button onClick={()=>{
            setViewOpen(true)
        }} >View</Button>
        <Button onClick={()=> {
            SetEditOpen(true)
        }} variant={"secondary"} >Edit</Button>
        <Button  variant={"destructive"} onClick={()=>{
            setOpen(true)
        }}>Delete</Button>
        </div>
        </div>
}