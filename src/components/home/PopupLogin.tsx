import LoginForm from "@/components/forms/LoginForm";
import { Button } from "@/components/ui/button";
import { IoCloseSharp } from "react-icons/io5";
export default function PopupLogin(props:{
    open:boolean
    setOpen:(open:boolean)=>void
}){
    if(!props.open) return null
    return <div className="h-screen w-full bg-black fixed top-0 left-0 z-20 bg-opacity-50 flex justify-center items-center">
        <div className="h-96 w-96 relative rounded-3xl bg-white flex flex-col justify-around items-center py-5">
            <Button variant={"ghost"} onClick={()=>{
                props.setOpen(false)
            }} className="absolute top-3  left-3"><IoCloseSharp className="text-2xl" /></Button>
            <p className="text-2xl font-semibold">Login</p>
                <LoginForm setopen={props.setOpen}/>
            
        </div>
    </div>
}