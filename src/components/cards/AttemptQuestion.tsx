import { IoMdCloseCircleOutline } from "react-icons/io";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export default function AttemptQuestion(props:{
    open:boolean,
    setOpen:any,
    image:String,
    question:String,
    id:String
}){
    if(!props.open) return null
    const [answer,setAnswer] = useState("")
    const MutateAnswer = useMutation({
        mutationFn:async ()=>{
            const response = await axios.post(`http://localhost:3000/questions/checkanswer/${props.id}`,{
                answer
            },{
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                },
                
            })
            return response.data
        },
        onSuccess(data){
            if(data.success){
                toast.success("Correct answer")
            }else{
                toast.error("wrong answer")
            }
            
        },
    },
    
)
    return <div className="h-screen w-full z-50 bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center">
        <div className="h-96 w-1/2 rounded-3xl bg-white absolute flex">
        <Button variant={"destructive"} onClick={()=>{
            props.setOpen(false)
        }} className="relative top-2 left-2 rounded-full h-fit w-fit p-2"><IoMdCloseCircleOutline className="text-2xl " /></Button>
        <div className="h-full w-1/2 flex justify-center items-center">
        <img src={`${props.image}`} className="w-2/3 h-2/3 object-cover"></img>
        </div>
        <div className="h-full w-1/2  flex flex-col justify-center items-start pl-2">
        <div className="h-2/3 w-2/3 flex flex-col justify-between items-start">
        <p className="text-start text-lg font-medium mb-2">{props.question} </p>
        <div>
        <Input onChange={(e)=>{
            setAnswer(e.target.value)
        }} placeholder="Answer" className="mb-2" ></Input>
        <Button disabled={MutateAnswer.isPending} onClick={()=>{
            MutateAnswer.mutate()
        }}>Submit</Button>
        </div>
        </div>
        </div>
        </div>

    </div>
}