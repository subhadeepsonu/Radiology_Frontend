export default function AdminFlashCard(props:{
    question:string
}){
    return <div className="h-20 bg-violet-100 w-full flex justify-center items-center">
        {props.question}
        </div>
}