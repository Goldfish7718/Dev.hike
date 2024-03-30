import Loading from "@/components/Loading"
import { useAuth } from "@clerk/clerk-react"
import { Outlet, useNavigate } from "react-router-dom"

const ProtectRoute = () => {
    const { isSignedIn, isLoaded } = useAuth()
    const navigate = useNavigate()
    
    if (!isLoaded && !isSignedIn) return <Loading />
    if (isLoaded && !isSignedIn) navigate('/sign-in')
    else return <Outlet />
}

export default ProtectRoute