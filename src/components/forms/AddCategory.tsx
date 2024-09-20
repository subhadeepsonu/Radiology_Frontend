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
export default function  AddCategory(props:{
  setOpen:any
}){
  const queryClient = useQueryClient()
    const schema = z.object({
        name:z.string(),
    })
    const from = useForm({
        resolver:zodResolver(schema),
        mode:"onChange"
    })
    const MutateAdd = useMutation({
      mutationFn:async ()=>{
        const response = await axios.post(`${baseurl}/category/create`,from.getValues(),{
          headers:{
            "Authorization":`${localStorage.getItem("token")}`
          }
        })
        return response.data
      },
      onSuccess: async (data)=>{
        if(data.success){
          toast.success("Added category")
          await queryClient.invalidateQueries({
            queryKey:["category"]
          })
          props.setOpen(false)
        }
        else{
          toast.error(data.message)
        }
      },
      onError:(error)=>{
        toast.error(error.message)
      }
    })
    return <Form {...from}>
        <form onSubmit={from.handleSubmit(()=>{
          MutateAdd.mutate()
        })} className="min-h-32 gap-2 w-96 flex justify-around bg-white items-center flex-col rounded-3xl" >
        <FormField 
          control={from.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="Category" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={MutateAdd.isPending} type="submit">{(MutateAdd.isPending)?<AiOutlineLoading className="animate-spin" />:"submit"}</Button>
        </form>
    </Form>
}