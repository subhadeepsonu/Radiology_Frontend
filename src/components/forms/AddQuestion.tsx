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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { baseurl } from "@/utills/consant"
import { toast } from "sonner"
import { AiOutlineLoading } from "react-icons/ai"
type difficulty = "easy" | "medium" | "hard";
export default function AddQuestionForm(props:{
  setOpen:any
}){
  const [image, setImage] = useState(null);
  const [loading,setLoading] = useState(false)
  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    
    if (!file) {
      console.error('No image selected');
      return;
    }
  
    setImage(file); 
  
    const formData = new FormData();
    formData.append('file', file); 
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
    const schema = z.object({
        question:z.string().min(1),
        answer:z.string().min(1),
        image:z.string().min(1),
        description:z.string().min(1),
        categoryid:z.string().min(1),
        difficulty:z.enum(["easy","medium","hard"]),
        keyword1:z.string().min(1),
        keyword2:z.string().min(1),
        keyword3:z.string().min(1),

    })
    const form = useForm<z.infer<typeof schema >>({
        resolver:zodResolver(schema),
        mode:"onChange"
    })
    const queryClient = useQueryClient()
    const MutateAdd = useMutation({
      mutationFn:async ()=>{
        const response = await axios.post(`${baseurl}/questions/create`,form.getValues(),{
          headers:{
            "Authorization":`${localStorage.getItem("token")}`
          }
        })
        return response.data
      },
      onSuccess:async (data)=>{
        console.log(data)
        if(data.success){
          toast.success("Question Added Successfully")
          await queryClient.invalidateQueries({
            queryKey:["questions"]
          })
          props.setOpen(false)
        }
        else{
          toast.error("Something went wrong")
        }
      },
      onError:(error)=>{
        console.log(error)
        toast.error("Something went wrong")
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
            MutateAdd.mutate()
            })} className="h-fit w-fit px-5  py-2 flex justify-around bg-white items-center flex-col rounded-3xl" >
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
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="Question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Input className="w-72"  placeholder="answer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input className="w-72"  placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-between items-center">
        <FormField
          control={form.control}
          name="categoryid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
              <select  onChange={(e)=>{
                  form.setValue("categoryid",e.target.value)
                }} className="w-44 block border-2 p-2 rounded-lg" >
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
                <select className="w-44 border-2 p-2  rounded-lg block" onChange={(e)=>{
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
        </div>
        <div className="flex gap-2">
        <FormField
          control={form.control}
          name="keyword1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>keyword1</FormLabel>
              <FormControl>
                <Input className="w-32"  placeholder="keyword1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keyword2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>keyword2</FormLabel>
              <FormControl>
                <Input className="w-32"  placeholder="keyword2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keyword3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>keyword3</FormLabel>
              <FormControl>
                <Input className="w-32"  placeholder="keyword3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
</div>
        <Button disabled={MutateAdd.isPending} className="mt-2" type="submit">{(MutateAdd.isPending)?<AiOutlineLoading className="animate-spin" />:"submit"}</Button>
        </form>
    </Form>
}