import { Button } from "../ui/button"
import { AiOutlineLoading } from "react-icons/ai";
export default function ConfirmAlert(props:{
    open:boolean,
    setopen:any,
    text:String
    function:()=>void,
    loading:boolean
}){
    if(!props.open) return null
    return <div className="h-screen z-50 fixed left-0 top-0 w-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="h-40 bg-white w-96 rounded-3xl flex flex-col  justify-around items-center ">
            <p className="text-lg font-medium h-1/2 flex justify-center items-center" >{props.text}</p>
            <div className="h-1/2 flex justify-around items-center w-full">
                <Button disabled={props.loading} onClick={props.function}>{(props.loading)?<AiOutlineLoading className="animate-spin" />:"Yes"}</Button>
                <Button  variant={"secondary"} onClick={()=>{
                    props.setopen(false)
                }}>No</Button>
            </div>
        </div>
    </div>
}