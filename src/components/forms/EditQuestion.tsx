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
export default function EditQuestionForm(){
    const navigate = useNavigate()
    const schema = z.object({
        Question:z.string().min(1),
        answer:z.string().min(1)
    })
    const form = useForm<z.infer<typeof schema >>({
        resolver:zodResolver(schema),
        mode:"onChange"
    })
    return <Form  {...form}>
        <form onSubmit={form.handleSubmit(()=>{
            navigate("/userdash")
            })} className="h-80 w-96 flex justify-around bg-white items-center flex-col rounded-3xl" >
        <FormField 
          control={form.control}
          name="Question"
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
        <Button  type="submit">Submit</Button>
        </form>
    </Form>
}