export default function AdminQuestionPopUp(props:{
    question:string,
    answer:string,
    description:string,
    keyword1:string,
    keyword2:string,
    keyword3:string,
    difficulty:string,
}){
    return <div className="h-fit w-80 rounded-3xl flex flex-col justify-around items-start pl-2 gap-5 py-5">
        <p className="w-full font-medium">question:{props.question}</p>
        <p className="w-full font-medium">answer:{props.answer}</p>
        <p className="w-full font-medium">description:{props.description}</p>
        <p className="w-full font-medium">keyword1:{props.keyword1}</p>
        <p className="w-full font-medium">keyword2:{props.keyword2}</p>
        <p className="w-full font-medium">keyword3:{props.keyword3}</p>
        <p className="w-full font-medium">difficulty:{props.difficulty}</p>
    </div>
}