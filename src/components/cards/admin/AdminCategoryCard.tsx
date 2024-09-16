export default function AdminCategoryCard(props:{
    name:string,
}) {
    return (
        <div className="h-20 bg-cyan-100 w-full flex justify-center items-center">
            {props.name}
        </div>
    )
}