import ConfirmAlert from "@/components/Alerts/ConfirmAlert";
import FormPopUp from "@/components/Alerts/FormPopUp";
import EditCategory from "@/components/forms/EditCategory";
import { Button } from "@/components/ui/button";
import { baseurl } from "@/utills/consant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
export default function AdminCategoryCard(props:{
    id:string,
    name:string
}) {
    const[open,setOpen] = useState(false)
    const [editopen,SetEditOpen] = useState(false)
    const queryClient = useQueryClient()
    const MuatateDelete = useMutation({
        mutationFn:async()=>{
            const response = await axios.delete(`${baseurl}/category/delete/${props.id}`,{
                headers:{
                    Authorization: `${localStorage.getItem("token")}`
                }
            })
            return response.data
        },
        onSuccess:(data)=>{
            if(data.success){
                toast.success("Category Deleted Successfully")
                setOpen(false)
                queryClient.invalidateQueries({
                    queryKey:["category"]
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
    return (
        <div className="h-32  border-2 border-gray-200 rounded-lg w-full flex flex-col justify-around items-center">
            <FormPopUp open={editopen} setOpen={SetEditOpen} title="Edit Category" form={<EditCategory setOpen={SetEditOpen} id={props.id} name={props.name} />} />
            <ConfirmAlert  open={open} setopen={setOpen} loading={MuatateDelete.isPending} text={"Are you sure ?"} function={()=>{
                MuatateDelete.mutate()
            }}  />
            <p className="text-center font-medium text-lg">{props.name}</p>
            <div className=" flex justify-around items-center w-full">
                <Button  variant={"secondary"} onClick={()=>{
                    SetEditOpen(true)
                }}>Edit</Button>
                
                <Button variant={"destructive"} onClick={()=>{
                    setOpen(true)
                }}>Delete</Button>
            </div>
        </div>
    )
}