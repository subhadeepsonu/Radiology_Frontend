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
export default function EditFlashCard(props:{
    question:string,
    answer:string,
    description:string,
    catid:string
}) {
    const schema = z.object({
        question:z.string().min(1),
        answer:z.string().min(1),
        description:z.string().min(1),
        catid:z.string().min(1)
    })
    const form = useForm<z.infer<typeof schema>>({
        resolver:zodResolver(schema),
        mode:"onChange",
        defaultValues:{
            question:props.question,
            answer:props.answer,
            description:props.answer,
            catid:props.catid
        }
    })
    return <Form {...form}>
        <form>
        <FormField 
          control={form.control}
          name="question"
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
                <Input className="w-72" placeholder="Answer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="catid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>catid</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="Questio\" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </form>
    </Form>
}