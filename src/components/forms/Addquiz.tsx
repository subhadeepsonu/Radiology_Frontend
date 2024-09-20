import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { baseurl } from "@/utills/consant"
import { toast } from "sonner"
import { AiOutlineLoading } from "react-icons/ai"
type difficulty = "easy" | "medium" | "hard";
export default function AddQuiz(props:{
  setOpen:any
}){
    const [image, setImage] = useState(null);
    const [loading,setLoading] = useState(false)
    const schema = z.object({
      image:z.string().min(1),
      name:z.string().min(1),
      categoryid:z.string().min(1),
      difficulty:z.enum(["easy","medium","hard"])
  })
  const form = useForm<z.infer<typeof schema >>({
      resolver:zodResolver(schema),
      mode:"onChange"
  })
  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    
    if (!file) {
      console.error('No image selected');
      return;
    }
  
    setImage(file); // You can still update the state if needed elsewhere.
  
    const formData = new FormData();
    formData.append('file', file); // Use the `file` variable directly.
    formData.append('upload_preset', 'Radiology');
  
    try {
      setLoading(true);
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/db86r4idv/image/upload',
        formData
      );
  
      form.setValue("image", response.data.secure_url);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };
  
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
  const queryClient = useQueryClient()
  const MutateQuiz = useMutation({
    mutationFn:async ()=>{
      const response = await axios.post(`${baseurl}/quiz/create`,form.getValues(),{
        headers:{
          "Authorization":`${localStorage.getItem("token")}`
        }
      })
      return response.data
    },
    onSuccess:async(data)=>{
      if(data.success){
       
       await queryClient.invalidateQueries({
          queryKey:["quiz"]
        })
        toast.success("Quiz Added")
        props.setOpen(false)  
      }
      else{
        console.log(data)
        toast.error("erro")
      }
    },
    onError:(error)=>{
      console.log(error)
      toast.error(error.message)
    }
  })
    if(QueryCategory.isLoading){
      return <div className="h-screen w-full flex justify-center items-center">
          Loading...</div>
    }
    if(QueryCategory.isError){
        return <div className="h-screen w-full flex justify-center items-center">
            Error</div>
    }
    if(QueryCategory.data.data.length === 0){
        return <div className="h-screen w-full flex justify-center items-center">
            No Category</div>
    }
    return <Form  {...form}>
        <form onSubmit={form.handleSubmit(()=>{
            console.log(form.getValues())
            MutateQuiz.mutate()
            })} className="h-fit my-2 w-96 flex justify-around bg-white items-center flex-col rounded-3xl" >
        <FormField 
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>{(loading)?"uploading..":"Image"}</FormLabel>
              <FormControl>
                <Input onChange={handleImageChange}  className="w-72" placeholder="image" type="file" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input className="w-72"  placeholder="answer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
              <select  onChange={(e)=>{
                  form.setValue("categoryid",e.target.value)
                }} className="w-72 block border-2 p-2 rounded-lg" >
                  <option key={0} value={""} >Select a category</option>
                  {QueryCategory.data.data.map((cat:any,index:number)=>{
                    return <option key={index} value={cat.id}>{cat.name}</option>
                  })}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="difficulty"
          render={() => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <FormControl>
                <select className="w-72 border-2 p-2  rounded-lg block" onChange={(e)=>{
                  form.setValue("difficulty",e.target.value as difficulty)
                }}>
                    <option value="">Select Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={MutateQuiz.isPending} className="my-2"  type="submit">{(MutateQuiz.isPending)?<AiOutlineLoading className="animate-spin" />:"submit"}</Button>
        </form>
    </Form>
}