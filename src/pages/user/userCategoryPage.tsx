import CategoryCard from "@/components/cards/category";
import UserSideBar from "@/components/userDash/userSideBard";
import { baseurl } from "@/utills/consant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function UserCategoryPage() {
    
    const QueryCategory = useQuery({
        queryKey:["category"],
        queryFn:async()=>{
            const response = await axios.get(`${baseurl}/category`,{
                headers:{
                    "Authorization":`${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    })
    if(QueryCategory.isLoading){
        return <div className="h-screen w-full flex justify-center items-center">
            <UserSideBar />Loading...</div>
    }
    if(QueryCategory.isError){
        return <div className="h-screen w-full flex justify-center items-center">
            <UserSideBar />Error</div>
    }
    if(QueryCategory.data.data.length === 0){
        return <div className="h-screen w-full flex justify-center items-center">
            <UserSideBar />
            No Category</div>
    }
    if(QueryCategory.data.data.length > 0){
        return <div className="flex justify-center items-start h-screen w-full pl-44 pt-20  ">
        <UserSideBar />
        <div className="grid grid-cols-4 gap-5 w-full px-5">
            {QueryCategory.data.data.map((category:any)=>{
                return <CategoryCard id={category.id} imgurl={"https://t3.ftcdn.net/jpg/02/19/91/48/360_F_219914874_fcqxEeJ6clfwf43OcCNAMGNBySKzF5hl.jpg"} name={category.name} questions={category._count.questions} key={category.id} />
            })}

        </div>
        </div>
    }
   
}