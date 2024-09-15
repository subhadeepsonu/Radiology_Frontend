import {  useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function SideBarBUtton(props:{
    icon:any,
    path:string,
    href:string
}){
    const [active, setActive] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
        if(location.pathname === props.href){
            setActive(true)
        }else{
            setActive(false)
        }
    },[location.pathname])
    return <div onClick={()=>{
        navigate(props.href)
    }}  className="flex justify-center items-center my-3  ">
        <div className={`p-3 w-10/12 ${(active)?"bg-purple-500  text-white transition-all duration-300":"hover:bg-purple-100"}  rounded-xl hover:cursor-pointer flex justify-start items-center`}>
        {props.icon} 
        <p className="ml-2 font-medium">{props.path}</p>
        </div>
    </div>
}