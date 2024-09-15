
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import ConfirmAlert from "../Alerts/ConfirmAlert";
import { useState } from "react";

export default function QuizCard(props:{
    id:String,
    imgurl:string,
    title:string
}){
    const [open,setOpen] = useState(false)
    const navigate = useNavigate()
    return <div className="h-96 rounded-lg w-80 bg-white border-2 border-gray-100  ">
        <ConfirmAlert text={"Do you want to attempt this quiz"} open={open} setopen={setOpen}function={()=>{
            navigate(`/userdash/quiz/${props.id}`)
        }} />
        <img src={props.imgurl} className="h-64  w-full p-2 object-cover"></img>
        <div className="flex flex-col justify-around items-center h-32" >
            <p className="text-start w-full px-2 font-medium ">{props.title}</p>
            <div className="w-full flex justify-between px-2 items-center">
                <Link to={`/userdash/submissions/${props.id}`}>
                <Button variant={"secondary"}>Submissions</Button>
                </Link>
                
                <Button onClick={()=>{
                    setOpen(true)
                }}>Start Quiz</Button>
                
            </div>
        </div>
    </div>
}