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
export default function EditQuizForm(){
    const navigate = useNavigate()
    const schema = z.object({
        image:z.instanceof(File),
        Title:z.string().min(1)
    })
    const form = useForm<z.infer<typeof schema >>({
        resolver:zodResolver(schema),
        mode:"onChange"
    })
    return <Form  {...form}>
        <form onSubmit={form.handleSubmit(()=>{
            navigate("/userdash")
            })} className="h-60 w-96 flex justify-around bg-white items-center flex-col rounded-3xl" >
        <FormField 
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input className="w-72" type="file" placeholder="Question"  />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="Title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Input className="w-72"  placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  type="submit">Submit</Button>
        </form>
    </Form>
}