import { useEffect, useState } from "react"
import {jwtDecode} from "jwt-decode"
import UserContext from "./user"
export default function UserProvider(props:any){
    const [user, setUser] = useState<any>()
    const [loading, setLoading] = useState(true)
    const token:any = localStorage.getItem("token")
    
    useEffect(() => {
        if (token) {
            const decode:any = jwtDecode(token)
            setUser({
                id: decode.id,
                role: decode.role
            })
        }
        setLoading(false)
    }, [token])
    
    return <UserContext.Provider value={{user, setUser, loading}}>
        {props.children}
    </UserContext.Provider>
}