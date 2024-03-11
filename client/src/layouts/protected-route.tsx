import { useAuth } from "@clerk/clerk-react"
import { Outlet, useNavigate } from "react-router-dom"
 
export default function ProtectedRoute() {
  const { isSignedIn, isLoaded } = useAuth()
  const navigate = useNavigate()
 
    if (!isLoaded) return <div className="mt-40">Loading</div>
    if (isLoaded && !isSignedIn) navigate('/sign-in')
 
  return (
    <>
        {isSignedIn && <Outlet />}
    </>
  )
}