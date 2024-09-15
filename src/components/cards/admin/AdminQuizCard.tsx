
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ConfirmAlert from "@/components/Alerts/ConfirmAlert";
import FormPopUp from "@/components/Alerts/FormPopUp";
import EditQuizForm from "@/components/forms/EditQuiz";

export default function AdminQuizCard(props:{
    imgurl:string,
    title:string
}){
    const [open,setOpen]=useState(false)
    const [editopen,seteditopen] = useState(false)
    return <div className="h-96 rounded-lg w-80 bg-white border-2 border-gray-100">
        <ConfirmAlert open={open} setopen={setOpen} text={"Do you want to delete this?"} function={()=>{
        }} />
        <FormPopUp title="Edit Quiz card" form={<EditQuizForm />} open={editopen} setOpen={seteditopen} />
        <img src={props.imgurl} className="h-64  w-full p-2 object-cover"></img>
        <div className="flex flex-col justify-around items-center h-32" >
            <p className="text-start w-full px-2 font-medium ">{props.title}</p>
            <div className="w-full flex justify-around px-2 items-center">
                <Button onClick={()=>{
                    seteditopen(true)
                }} variant={"secondary"}>Edit</Button>
                <Button onClick={()=>{
                    setOpen(true)
                }} variant={"destructive"}>Delete</Button>
                <Link to={"quiz/2"}>
                <Button  >Open</Button>
                </Link>
            </div>
        </div>
    </div>
}