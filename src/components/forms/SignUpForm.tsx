"use client"
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
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useContext } from "react"
import UserContext from "@/context/user"


export default function SignupForm(props:{
  setopen:any
}){
  const router = useNavigate()
    const  signUpSchema = z.object({
        username:z.string(),
        email:z.string().email(),
        password:z.string().min(8)
    })
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver:zodResolver(signUpSchema)
    })  
    const auth = useContext(UserContext)
    const values = form.getValues()
    const MutateSignUp = useMutation({
      mutationFn:async()=>{
        const response = await axios.post("http://localhost:3000/user/register",
        values
          ,{
          withCredentials:true,
          headers: { "Content-Type": "application/json" },
        })
        return response.data
      },
      onSuccess(data) {
        if(data.success === true){
          localStorage.setItem("token",data.token)
          localStorage.setItem("id",data.id)
          localStorage.setItem("role",data.role)
          auth.setUser({id:data.id,role:data.role})
          props.setopen(false)
          toast.success("Signup Successful")
          
          router("/userdash")
        }
        else{
          toast.error(data.message)
        }  
      },
      onError(data){
        toast.error(data.message)
      }
    })  
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(()=>{
          MutateSignUp.mutate()
        })} className="h-80 w-full flex flex-col justify-around items-center">
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="name" {...field} />
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
                <Input type="password" className="w-72" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button disabled={MutateSignUp.isPending} type="submit">Submit</Button>
        
        </form>
    </Form>
}