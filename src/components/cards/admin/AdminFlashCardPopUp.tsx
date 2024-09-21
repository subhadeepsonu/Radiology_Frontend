export default function AdminFlashCardPopUp(props:{
    question:string,
    answer:string,
    description:string
}){
    return <div className="h-fit w-80 rounded-3xl flex flex-col justify-around items-start pl-2 gap-5 py-5">
        <p className="w-full font-medium">question:{props.question}</p>
        <p className="w-full font-medium">answer:{props.answer}</p>
        <p className="w-full font-medium">description:{props.description}</p>
    </div>
}