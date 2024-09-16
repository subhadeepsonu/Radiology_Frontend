"use client"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import AttemptQuestion from "./AttemptQuestion";
export default function QuestionCard(props:{
    id:String,
    question:string,
    category:string,
    difficulty:string,
    key:number,
    image:String
}){
    const [color,setColor] = useState("")
    const [bg,setBg] = useState("")
    const [open,setOpen] = useState(false)
    useEffect(()=>{
        if(props.difficulty==="Medium"){
            setColor("text-yellow-500")
        }
        else if(props.difficulty==="Hard"){
            setColor("text-red-500")
        }
        else{
            setColor("text-green-500")
        }
        if(props.key%2===0){
            setBg("bg-gray-100")
        }
    },[props.difficulty])
    return <div className={`w-10/12 h-12 border-b-2 border-gray-100 flex justify-between items-center ${bg}`}>
        <AttemptQuestion id={props.id}  image={props.image} question={props.question} open={open}  setOpen={setOpen} />
        <div className="w-1/2">
            {props.question}{props.key}
        </div>
        <div className="w-1/6">
            {props.category}
        </div>
        <div className={`w-1/6 ${color}`}>
            {props.difficulty}
        </div>
        <Button onClick={()=>{
            setOpen(true)
        }} >Try</Button>
    </div>
}