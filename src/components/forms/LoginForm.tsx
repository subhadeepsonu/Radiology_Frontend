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
import  { useNavigate } from "react-router-dom"
import { useContext } from "react"
import UserContext from "@/context/user"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios"

export default function LoginForm(props:{
  setopen:any
}){
    const router = useNavigate()
    const loginSchema = z.object({
        email:z.string().email(),
        password:z.string().min(8)
    })
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver:zodResolver(loginSchema),
        mode:"onChange"
    })
    const auth = useContext(UserContext)
    const values = form.getValues()
    const MutateLogin = useMutation({
      mutationFn:async()=>{
        const response = await axios.post("http://localhost:3000/user/login",values,{
          withCredentials:true,
          headers: { "Content-Type": "application/json" },
        }
        )
        return response.data
      },
      onSuccess:(data)=>{
        if(data.success === true){
          localStorage.setItem("token",data.token)
          localStorage.setItem("id",data.id)
          localStorage.setItem("role",data.role)
          toast.success("Login Successful")
          auth.setUser({id:data.id,role:data.role})
          props.setopen(false)
          router("/userdash")
        }
        else{
          toast.error(data.message)
        }
       
      },
      onError:(data)=>{
        toast.error(data.message)
      }
    })
    return <Form  {...form}>
        <form onSubmit={form.handleSubmit(()=>{
          MutateLogin.mutate()
           })} className="h-60 w-96 flex justify-around bg-white items-center flex-col rounded-3xl" >
        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="email" {...field} />
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
                <Input className="w-72" type="password" placeholder="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={MutateLogin.isPending}  type="submit">Submit</Button>
        </form>
    </Form>
}