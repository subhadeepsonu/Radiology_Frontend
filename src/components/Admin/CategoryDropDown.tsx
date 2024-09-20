import { baseurl } from "@/utills/consant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function CategoryDropDown(props: { setCat: any }) {
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
        return <div className="w-40">Loading...</div>
    }
    if(QueryCategory.isError){
        return <div className="w-40">Error</div>
    }
    return (
        <div className="w-60 ">
            <select
                id="category"
                name="category"
                autoComplete="category"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => {
                    props.setCat(e.target.value)}}
            >
                <option value="">Select Category</option>
                {QueryCategory.data.data.map((category: any) => {
                    return <option value={category.id}>{category.name}</option>;
                })}
            </select>
        </div>
    );
}
