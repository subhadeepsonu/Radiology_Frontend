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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { baseurl } from "@/utills/consant"
import { toast } from "sonner"
import { AiOutlineLoading } from "react-icons/ai"
export default function  EditCategory(props:{
    id:string,
    name:string,
    setOpen:any
}){
    const schema = z.object({
        name:z.string(),
    })
    const from = useForm({
        resolver:zodResolver(schema),
        mode:"onChange",
        defaultValues:{
            name:`${props.name}`
        }
    })
    const QueryClient = useQueryClient()
    const MutateUpdate = useMutation({
      mutationFn:async ()=>{
        const response = await axios.put(`${baseurl}/category/edit/${props.id}`,
          from.getValues()
        ,{
          headers:{
            "Authorization":`${localStorage.getItem("token")}`
          }
        })
        return response.data
      },
      onSuccess:async (data)=>{
        if(data.success){
          toast.success("Category Updated")
          await QueryClient.invalidateQueries({
            queryKey:["category"]
          })
          props.setOpen(false)
        }
        else{
          toast.error("something went wrong")
        }
      },
      onError:()=>{
        toast.error("something went wrong")
      }
      
    })
    return <Form {...from}>
        <form onSubmit={from.handleSubmit(()=>{
          MutateUpdate.mutate()
        })} className="h-fit gap-2 w-96 flex justify-around bg-white items-center flex-col rounded-3xl" >
        <FormField 
          control={from.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="Category" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={MutateUpdate.isPending} type="submit" className="mb-2" >{(MutateUpdate.isPending)?<AiOutlineLoading className="animate-spin" />:"submit"}</Button>
        </form>
    </Form>
}