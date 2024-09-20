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
export default function EditUser(props:{
    username:string,
    email:string,
    password:string,
    role:any
}){
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
            username:props.username,
            email:props.email,
            password:props.password,
            role:props.role
        }
    })
    return <Form {...form}>
        <form>
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
              <FormLabel>role</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="role" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </form>
    </Form>
}