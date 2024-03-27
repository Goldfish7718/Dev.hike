import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle-switch"
import { ArrowUpRightFromSquare, CircleGauge, LogIn, LogOut, Menu, PenLine, Plus, Search, Settings, StickyNote, User, UserPlus, Zap } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet"
import { Link, useNavigate } from "react-router-dom"
import { SignOutButton, SignedIn, SignedOut, useUser } from "@clerk/clerk-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
  

const Navbar = () => {

    const navigate = useNavigate()
    const { user } = useUser()

  return (
    <nav className="p-4 fixed w-full flex justify-between items-center top-0 z-10 dark:bg-[#0c0a09] bg-white">

        {/* MOBILE NAVIGATION - [DRAWER] */}
        <SignedIn>
            <Drawer>
                <DrawerTrigger className="sm:hidden" asChild>
                    <PenLine />
                </DrawerTrigger>
                <DrawerContent>
                    <div className="p-4">
                        <div className="h-[200px] flex flex-col justify-center items-center rounded-md my-4 dark:bg-[#1c1c1c] bg-[#d1d1d1]">
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
                            <DrawerClose asChild>
                                <Button className="w-full" variant='outline' onClick={() => navigate('/new/timeline')}><Plus size={18} className="mx-1" /> Add to Timeline</Button>
                            </DrawerClose>
                            <DrawerClose asChild>
                                <Button className="w-full" variant='outline'><Zap size={18} className="mx-1" /> New Event</Button>
                            </DrawerClose>
                            <DrawerClose asChild>
                                <Button className="w-full" variant='outline'><StickyNote size={18} className="mx-1" /> New Post</Button>
                            </DrawerClose>
                            <DrawerClose asChild>
                                <Button className="w-full" variant='outline'><UserPlus size={18} className="mx-1" /> Invite Users</Button>
                            </DrawerClose>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </SignedIn>

        <h3 className="text-3xl hover:cursor-pointer" onClick={() => window.location.href = '/'}>Dev.hike</h3>

        {/* MOBILE NAVIGATION - [RIGHT SHEET] */}
        <Sheet>
            <SheetTrigger className="sm:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent>
                <div className="my-5 flex flex-col justify-center gap-3">
                    <ModeToggle />
                    <SignedOut>
                        <SheetClose asChild>
                            <Button onClick={() => navigate('/sign-in')} variant="outline">Sign In <LogIn size={18} className="mx-1" /></Button>
                        </SheetClose>

                        <SheetClose asChild>
                            <Button onClick={() => navigate('/sign-up')} variant="outline">Sign up <User size={18} className="mx-1" /></Button>
                        </SheetClose>
                    </SignedOut>
                    <SignedIn>
                        <SheetClose asChild>
                            <Button variant='outline'> {user?.fullName} <User size={18} className="mx-1" /></Button>
                        </SheetClose>

                        <SheetClose asChild>
                            <Button onClick={() => navigate('/dashboard')} variant='outline'>Dashboard <CircleGauge size={18} className="mx-1" /></Button>
                        </SheetClose>

                        <SheetClose asChild>
                            <Button variant='outline'>Settings<Settings size={18} className="mx-1" /></Button>
                        </SheetClose>

                        <SheetClose asChild>
                            <SignOutButton>
                                <Button variant='outline'>Log Out<LogOut size={18} className="mx-1" /></Button>
                            </SignOutButton>
                        </SheetClose>
                    </SignedIn>
                </div>
            </SheetContent>
        </Sheet>

        {/* DESKTOP NAVIGATION */}
        <div className="sm:flex gap-2 hidden">
            <ModeToggle />
            <SignedOut>
                <Button onClick={() => navigate('/sign-in')} variant='outline'>Sign In <LogIn size={18} className="mx-1" /></Button>
                <Button onClick={() => navigate('/sign-up')} variant='outline'>Sign Up <User size={18} className="mx-1" /></Button>
            </SignedOut>
            <SignedIn>
                <Button variant='outline' onClick={() => navigate('/dashboard')}>Dashboard <CircleGauge size={18} className="mx-1" /></Button>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant='outline'>
                            {user?.fullName} <User size={18} className="mx-1" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>View Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <SignOutButton signOutCallback={() => navigate('/sign-in')}>
                            <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log Out</span>
                            </DropdownMenuItem>
                        </SignOutButton>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SignedIn>
        </div>
    </nav>
  )
}

export default Navbar