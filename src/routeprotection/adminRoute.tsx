import UserContext from "@/context/user";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function AdminRouteProtect({children}:any){
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!user || user.role !== "admin") {
        return <Navigate to="/"/>;
    }

    return <div>
        {children}
    </div>;
}