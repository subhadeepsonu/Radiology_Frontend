import { CgNotes } from "react-icons/cg";
import { TiTick } from "react-icons/ti";
import { FaQuestion } from "react-icons/fa";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
export default function PerformanceCard(){
    const navigate = useNavigate()
    return <div className="flex justify-center items-center min-h-52 w-full">
    <div className="grid grid-cols-4 gap-5 px-5">
        <div className="w-80 h-28 flex justify-around items-center shadow-sm  rounded-lg border-2 border-gray-100">
            <div className="h-20 w-20 rounded-lg bg-orange-100 flex justify-center items-center">
            
            <FaQuestion className="text-orange-500 text-4xl" />
            </div>
            <div className="w-2/3 flex flex-col justify-around items-start pl-2  h-2/3">
                <p className="font-medium text-xl">Attempted Quizes</p>
                <p>21/30    </p>
            </div>
        </div>
        <div className="w-80 h-28 flex justify-around items-center shadow-sm  rounded-lg border-2 border-gray-100">
        <div className="h-20 w-20 rounded-lg bg-green-100 flex justify-center items-center">
            
            <TiTick className="text-green-500 text-4xl" />
            </div>
            <div className="w-2/3 flex flex-col justify-around items-start pl-2  h-2/3">
                <p className="font-medium text-xl">Solved Questions</p>
                <p>455/1567</p>
            </div>
        </div>
        <div className="w-80 h-28 flex justify-around items-center shadow-sm  rounded-lg border-2 border-gray-100">
        <div className="h-20 w-20 rounded-lg bg-yellow-100 flex justify-center items-center">
            <CgNotes className="text-yellow-500 text-4xl" />
            </div>
            <div className="w-2/3 flex flex-col justify-around items-start pl-2  h-2/3">
                <p className="font-medium text-xl">Flashcards</p>
                <p>Revise topics</p>
            </div>
        </div>
        <div onClick={()=>{
            navigate("submissions")
        }}  className="w-80 h-28 flex justify-around items-center shadow-sm  rounded-lg border-2 border-gray-100 hover:cursor-pointer">
        <div className="h-20 w-20 rounded-lg bg-red-100 flex justify-center items-center ">
            
            <HiMiniPaperAirplane  className="text-red-500 text-4xl"/>
            </div>
            <div className="w-2/3 flex flex-col justify-around items-start pl-2  h-2/3">
                <p className="font-medium text-xl">Submissions</p>
                <p>76</p>
            </div>
        </div>
    </div>
    </div>
}