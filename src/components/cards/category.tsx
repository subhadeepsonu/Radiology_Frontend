import { Link } from "react-router-dom"
export default function CategoryCard(props:{
    id:String,
    imgurl:string,
    name:string,
    questions:number
}){
    return <Link to={`/userdash/category/${props.id}`}>
    <div className="h-28 w-80 border-2 border-gray-100 flex justify-center shadow-sm items-center rounded-lg">
        <div className=" w-32 p-2 h-full">
            <img className="h-full w-full object-cover" src={props.imgurl} ></img>
        </div>
        <div className="w-48 h-full  flex flex-col justify-around items-start pl-2">
            <p className="font-medium text-xl">{props.name}</p>
            <p className="font-light">Questions: {props.questions}</p>
        </div>
    </div>
    </Link>
}