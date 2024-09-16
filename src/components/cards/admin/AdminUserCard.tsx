export default function AdminUserCard(props:{
   name:string,
}){
   return <div className="h-20 w-full bg-green-100 flex justify-center items-center">
      {props.name}
   </div>
}