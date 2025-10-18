import { Navigate } from "react-router-dom"

function ProtectedRouter({children}){
    const admin = localStorage.getItem("admin")
    if(!admin){
        return <Navigate to="/loginAdmin" />
    }
    return children 
}

export default ProtectedRouter