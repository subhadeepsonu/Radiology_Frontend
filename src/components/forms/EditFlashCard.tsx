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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { baseurl } from "@/utills/consant"
import axios from "axios"
import { toast } from "sonner"
import { AiOutlineLoading } from "react-icons/ai"
import { useState } from "react"
export default function EditFlashCard(props:{
  setOpen:any,
  id:string,
  question:string,
  answer:string,
  description:string,
  categoryid:string
}) {
  const [categoryid,setCategoryid] = useState(props.categoryid)
    const schema = z.object({
        question:z.string().min(1),
        answer:z.string().min(1),
        description:z.string().min(1),
        categoryid:z.string().min(1)
    })
    const form = useForm<z.infer<typeof schema>>({
        resolver:zodResolver(schema),
        mode:"onChange",
        defaultValues:{
          question:`${props.question}`,
          answer:`${props.answer}`,
          description:`${props.description}`,
          categoryid:`${props.categoryid}`
        }
    })
    const QueryClient = useQueryClient()
    const MutateAdd = useMutation({
      mutationFn:async ()=>{
        const response = await axios.put(`${baseurl}/flashcards/edit/${props.id}`,form.getValues(),{
          headers:{
            "Authorization":`${localStorage.getItem("token")}`
          }
        })
        return response.data
      },
      onSuccess: async (data)=>{
        if(data.success){
          
          toast.success("FlashCard Updated")
          await QueryClient.invalidateQueries({
            queryKey:["flashcards"]
          })
          props.setOpen(false)
        }
        else{
          console.log(data)
          toast.error(data.message)
        }
      },
      onError:(error)=>{
        toast.error(error.message)
      }
    })
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
    return <div>loading</div>
  }
  if(QueryCategory.isError){
    return <div>error</div>
  }
  if(QueryCategory.data.data.length>0){
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(()=>{
          MutateAdd.mutate()
        })} className="p-5 gap-2">
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
                <Input className="w-72" placeholder="Answer" {...field} />
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
                <Input className="w-72" placeholder="Description" {...field} />
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
              <FormLabel>catid</FormLabel>
              <FormControl>
                <select value={categoryid} onChange={(e)=>{
                  setCategoryid(e.target.value)
                  form.setValue("categoryid",e.target.value)
                }} className="w-full block border-2 p-2 rounded-lg" >
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
        <Button type="submit" disabled={MutateAdd.isPending}>{(MutateAdd.isPending)?<AiOutlineLoading className="animate-spin" />:"submit"}</Button>
        </form>
    </Form>
    }
}