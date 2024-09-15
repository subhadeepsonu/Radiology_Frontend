
import { useEffect, useState } from "react"
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
export default function SubmissionCard(props:{
    title:string,
    date:string,
    score:number
}){
    const [color,setColor] = useState("bg-red-100")
    const [icon,setIcon] = useState(<FaThumbsUp className="text-red-500 text-2xl" />)
    useEffect(()=>{
    if(props.score>70){
        setColor("bg-green-100")
        setIcon(<FaThumbsUp className="text-green-500 text-4xl" />)
    }
    else if(props.score>50){  
        setColor("bg-yellow-100")
        setIcon(<IoIosWarning className="text-yellow-500 text-4xl" />)
    }
    else{
        setColor("bg-red-100")
        setIcon(<FaThumbsDown className="text-red-500 text-4xl" />)
    }},[props.score])
    return <div className="h-28 border-2 border-gray-100 w-80  flex rounded-lg">
        <div className={`w-1/3 h-full ${color} flex justify-center items-center` }>
            {icon}
        </div>
        <div className="w-2/3">
        <div className="h-2/3 w-full flex justify-center items-start pl-2 flex-col">
            <p className="font-semibold text-lg">{props.title}</p>
            <p className="font-light text-sm">{props.date}</p>
        </div>
        <div  className="pl-2">
            score: {props.score}/100
        </div>
        </div>
    </div>
}