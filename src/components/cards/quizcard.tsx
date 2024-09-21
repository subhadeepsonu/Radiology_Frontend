
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import ConfirmAlert from "../Alerts/ConfirmAlert";
import { useState } from "react";
export default function QuizCard(props:{
    id:String,
    imgurl:string,
    title:string,
    category:String,
    questions:number
}){
    const [open,setOpen] = useState(false)
    const navigate = useNavigate()
    return <div className="h-96 rounded-lg w-full bg-white border-2 border-gray-200 shadow-sm relative  ">
        <div className="absolute h-8 font-medium w-fit px-2 flex justify-center items-center top-2 right-2 rounded-full bg-purple-100 text-purple-600 border-2">
            {props.category}
        </div>
        <ConfirmAlert loading={false} text={"Do you want to attempt this quiz"} open={open} setopen={setOpen}function={()=>{
            navigate(`/userdash/quiz/${props.id}`)
        }} />
        <img src={props.imgurl} className="h-64  w-full p-2 object-cover"></img>
        <div className="flex flex-col justify-around items-center h-32 pb-2" >
            <p className="text-start w-full px-2 font-medium ">{props.title}</p>
            <p className="text-start w-full px-2 text-sm text-gray-500 ">Questions: {props.questions}</p>
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