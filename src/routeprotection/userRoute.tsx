import UserContext from "@/context/user"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

export default function UserRouteProtect({children}:any){
    const { user, loading } = useContext(UserContext)
    if (loading) {
        return <div>Loading...</div> 
    }
    
    if (!user) {
        return <Navigate to="/"/>
    }
    if(user.role === "admin"){
        return <Navigate to="/admin"/>
    }
    
    return <div>
        {children}
    </div>
}