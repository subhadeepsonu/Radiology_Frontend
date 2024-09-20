import SideBar from "@/components/Admin/sideBar";
import AdminUsers from "@/components/Admin/Users";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import FormPopUp from "@/components/Alerts/FormPopUp";
import AddUser from "@/components/forms/AddUser";
export default function AdminUserPage() {
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const DebounceChange = useCallback(debounce((value)=>{
        setName(value)
    },500),[])
   return <div className="pt-20">
    <SideBar />
    <FormPopUp form={<AddUser setOpen={setOpen} />} open={open} setOpen={setOpen} title="Add  User" />
    <Button onClick={()=>{
      setOpen(true)  
    }} className="fixed right-5 bottom-5">Add User</Button>
    <div className="pl-48  flex justify-between items-center px-5 my-2">
        <p className="font-medium text-xl">Quizs</p>
            <Input onChange={(e)=>{
                        DebounceChange(e.target.value)
            }} placeholder="Search" className="w-60" />
        </div>
   <AdminUsers name={name} />
   </div>
}