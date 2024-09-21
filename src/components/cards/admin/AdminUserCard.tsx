import ConfirmAlert from "@/components/Alerts/ConfirmAlert";
import FormPopUp from "@/components/Alerts/FormPopUp";
import EditUserForm from "@/components/forms/EditUser";
import { Button } from "@/components/ui/button";
import { baseurl } from "@/utills/consant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminUserCard(props:{
   id:string,
   name:string,
   role:string,
   email:string,
}){
   const [admin,setAdmin] = useState(false)
   const [open,setOpen] = useState(false)
   const [editopen,SetEditOpen] = useState(false)
   useEffect(()=>{
      if(props.role === "admin"){
         setAdmin(true)
      }
      else{
         setAdmin(false)
      }
   },[props.role])
   const queryClient = useQueryClient()
   const MutateDelete = useMutation({
      mutationFn:async ()=>{
         const response = await axios.delete(`${baseurl}/user/delete/${props.id}`,{
            headers:{
               Authorization:`${localStorage.getItem("token")}`
            }
         })
         return response.data
      },
      onSuccess:async (data)=>{
         if(data.success){
            toast.success("User Deleted Successfully")
            setOpen(false)
            await queryClient.invalidateQueries({
               queryKey:["user"]
            })
         }
         else{
            console.log(data)
            toast.error("Something went wrong")
         }
      },
      onError:(error)=>{
         console.log(error)
         toast.error("Something went wrong")
      }
   })
   type role = "admin" | "user"
   return <div className="h-32 w-full border-2 border-gray-200 rounded-lg flex flex-col justify-around items-start pl-2">
      <ConfirmAlert loading={MutateDelete.isPending} open={open} setopen={setOpen} text={"Are you sure ?"} function={()=>{
         MutateDelete.mutate()
      }} />
      <FormPopUp open={editopen} setOpen={SetEditOpen} title="Edit User" form={<EditUserForm id={props.id} setOpen={SetEditOpen} email={props.email}  role={props.role as role} username={props.name} />} />
      <div className="flex flex-col justify-around items-start w-full">
      <p className="text-lg font-medium">{props.name}</p>
      <p className="w-full truncate text-ellipsis">{props.email}</p>
      <p className={`${(admin)?"text-red-500":"text-green-500"}`}>{props.role}</p>
      </div>
      <div className="flex justify-around items-center w-full">
         
         <Button onClick={()=>{
            SetEditOpen(true)
         }} variant={"secondary"} >Edit</Button>
         <Button  variant={"destructive"} onClick={()=>{
            setOpen(true)
         }}>Delete</Button>
      </div>
   </div>
}