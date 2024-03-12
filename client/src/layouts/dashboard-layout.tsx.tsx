import Loading from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@clerk/clerk-react"
import { ArrowUpRightFromSquare, Plus, Search, StickyNote, UserPlus, Zap } from "lucide-react"
import { Link, Outlet, useNavigate } from "react-router-dom"
 
export default function ProtectedRoute() {
  const { isSignedIn, isLoaded } = useAuth()
  const navigate = useNavigate()
 
  if (!isLoaded) return <Loading />
  if (isLoaded && !isSignedIn) navigate('/sign-in')
 
  return (
    <>
      {isSignedIn &&
        <>
          <nav className='min-h-screen fixed w-[300px] top-[72px] p-2 hidden sm:block'>
            <div className="h-[200px] flex flex-col justify-center items-center dark:bg-[#1c1c1c] rounded-md bg-[#d1d1d1]">
              <h3>Dev.hike</h3>
              <Button variant='link'>
                <Link to='https://www.github.com/goldfish7718/Dev.hike' target="_blank">Github repo</Link>
                <ArrowUpRightFromSquare size={18} className="mx-1" />
              </Button>
            </div>

            <div id="search" className="my-4 flex gap-2">
              <Input type="text" placeholder="Search Dev.hike"></Input>
              <Button variant='outline'><Search size={18} /></Button>
            </div>

            <div id="options" className="flex flex-col gap-2">
              <Button className="w-full" variant='outline'><Plus size={18} className="mx-1" /> Add to Timeline</Button>
              <Button className="w-full" variant='outline'><Zap size={18} className="mx-1" /> New Event</Button>
              <Button className="w-full" variant='outline'><StickyNote size={18} className="mx-1" /> New Post</Button>
              <Button className="w-full" variant='outline'><UserPlus size={18} className="mx-1" /> Invite Users</Button>
            </div>
          </nav>
          <main className="ml-[300px] mt-[72px]">
            <Outlet />
          </main>
        </>
      }
    </>
  )
}