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
type role = "admin" | "user"
export default function AddUser(props:{
  setOpen:any
}){
  const queryClient = useQueryClient()
    const schema = z.object({
        username:z.string().min(1),
        email:z.string().email(),
        password:z.string().min(8),
        role:z.enum(["user","admin"])
    })
    const form = useForm<z.infer<typeof schema>>({
        resolver:zodResolver(schema),
        mode:"onChange",
        defaultValues:{
          "role":"user"
        }
    })
    const values = form.getValues()
    const MutateAdd = useMutation({
      mutationFn:async ()=>{
        const response = await axios.post(`${baseurl}/user/adduser`,
          values
        ,{
          headers:{
            "Authorization":`${localStorage.getItem("token")}`
          }
        })
        return response.data
      },
      onSuccess:async(data)=>{
        if(data.success){
          toast.success("User added")
          await queryClient.invalidateQueries({
            queryKey:["user"]
          })
          props.setOpen(false)
        }else{
          toast.error(data.message)
        }
        
      },
      onError:(error)=>{
        console.log(error)
        toast.error("error")
      }
    })
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(()=>{
          MutateAdd.mutate()
        })} className="p-5">
        <FormField 
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <select {...field} onChange={(e)=>{
                  form.setValue("role",e.target.value as role)
                }} className="w-72 block border-2  rounded-lg p-2">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                 </select>   
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={MutateAdd.isPending} className="mt-2">Submit</Button>
        </form>
    </Form>
}