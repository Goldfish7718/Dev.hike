import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpRightFromSquare, ChevronRight, Plus, Search, StickyNote, UserPlus, Zap } from "lucide-react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import ReplyDialogTrigger from '@/components/ReplyDialogTrigger'
 
export default function ProtectedRoute() {

  const navigate = useNavigate()
 
  return (
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
          <Button className="w-full" variant='outline' onClick={() => navigate('/new/timeline')}><Plus size={18} className="mx-1" /> Add to Timeline</Button>
          <Button className="w-full" variant='outline' onClick={() => navigate('/new/event')}><Zap size={18} className="mx-1" /> New Event</Button>
          <Button className="w-full" variant='outline' onClick={() => navigate('/new/post')}><StickyNote size={18} className="mx-1" /> New Post</Button>
          <ReplyDialogTrigger>
            <Button className="w-full" variant='outline'><UserPlus size={18} className="mx-1" /> Replies</Button>
          </ReplyDialogTrigger>
        </div>
      </nav>

      <nav className="min-h-screen fixed xl:w-[300px] right-0 hidden lg:block lg:w-[220px]">
        <h4 className="dark:text-gray-200 text-black">Dev.hike.info&#40;&#41;</h4>

        <div className="p-3 flex flex-col gap-2 items-start">
          <Button variant='link' className="dark:text-gray-300 text-gray-900"><span className="hover:mr-1 transition-all duration-200">About Dev.hike</span> <ChevronRight size={18} className="mx-2" /></Button>
          <Button variant='link' className="dark:text-gray-300 text-gray-900"><span className="hover:mr-1 transition-all duration-200">Contact</span> <ChevronRight size={18} className="mx-2" /></Button>
          <Button variant='link' className="dark:text-gray-300 text-gray-900"><span className="hover:mr-1 transition-all duration-200">Developers/Contributors</span> <ChevronRight size={18} className="mx-2" /></Button>
        </div>
      </nav>
      <main className="sm:ml-[300px] mt-[72px] p-2">
        <Outlet />
      </main>
    </>
  )
}