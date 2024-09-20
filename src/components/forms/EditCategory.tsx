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
export default function  EditCategory(props:{
    name:string
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
    return <Form {...from}>
        <form className="h-80 w-96 flex justify-around bg-white items-center flex-col rounded-3xl" >
        <FormField 
          control={from.control}
          name="name"
          render={() => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="Category" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-blue-500 text-white w-36 h-10 rounded-3xl">Submit</Button>
        </form>
    </Form>
}