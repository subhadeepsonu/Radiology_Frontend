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
export default function AddQuiz(){
    const navigate = useNavigate()
    const schema = z.object({
        image:z.instanceof(File),
        title:z.string()
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
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="Question" type="file" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
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