import CategoryCard from "@/components/cards/category";  
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function CategoryPage(){
  const QueryCategory = useQuery({
    queryKey:["Category"],
    queryFn:async ()=>{
      const response = await axios.get("http://localhost:3000/category",{
        headers:{
          "Authorization":`${localStorage.getItem("token")}`
        }
      })
      return response.data
    }
  })
  if(QueryCategory.isLoading){
    return <div className="min-h-96 w-full flex flex-col justify-center items-center my-10">
    <p className="w-full px-5 font-semibold text-4xl pl-24 mb-2">Categories</p>
    Loading...

    </div>
  }
  if(QueryCategory.isError){
    return <div className="min-h-96 w-full flex flex-col justify-center items-center my-10">
    <p className="w-full px-5 font-semibold text-4xl pl-24 mb-2">Categories</p>
    Error...

    </div>
  }
  if(QueryCategory.data.data.length===0){
    return <div className="min-h-96 w-full flex flex-col justify-center items-center my-10">
    <p className="w-full px-5 font-semibold text-4xl pl-24 mb-2">Categories</p>
    NO Categories

    </div>
  }
  if(QueryCategory.data.data.length>0){
    return <div className="min-h-96 w-full flex flex-col justify-center items-center my-10">
        <p className="w-full px-5 font-semibold text-4xl pl-24 mb-2">Categories</p>
        <div className="grid grid-cols-4 gap-5">
           {QueryCategory.data.data.map((category:any)=>{
            return <CategoryCard id={category.id} imgurl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s"} name={category.name} questions={category._count.questions}></CategoryCard>
           })}
        </div>
    </div>
  }
    
}