import { IoMdCloseCircleOutline } from "react-icons/io"
import { Button } from "../ui/button"
export default function FormPopUp(props:{
    open:boolean,
    setOpen:any,
    form:React.ReactElement,
    title:string
}){
    if(!props.open) return null
    return <div className="h-screen w-full z-50 bg-black bg-opacity-50 flex justify-center items-center fixed top-0 left-0">
        <div className="h-fit w-fit bg-white rounded-3xl">
            <div className="h-16 w-full  flex justify-center items-center relative ">
                <Button className="absolute top-2 left-2 h-fit w-fit p-2 rounded-full" variant={"destructive"} onClick={()=>{
                    props.setOpen(false)
                }}><IoMdCloseCircleOutline className="text-2xl" /></Button>
            
                <p className="text-lg font-medium">{props.title}</p></div>
        {props.form}
        </div>
    </div>
}