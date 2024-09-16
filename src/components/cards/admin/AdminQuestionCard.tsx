export default function AdminQuestionCard(props:{
    question:string,
}){
    return <div className="h-20 bg-yellow-50 w-full flex justify-center items-center">
        {props.question}
    </div>
}