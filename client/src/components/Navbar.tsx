import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle-switch"
import { LogIn, LogOut, Menu, Settings, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useNavigate } from "react-router-dom"
import { SignOutButton, SignedIn, SignedOut, useUser } from "@clerk/clerk-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

const Navbar = () => {

    const navigate = useNavigate()
    const { user } = useUser()

  return (
    <nav className="p-4 fixed w-full flex justify-between items-center backdrop-blur-sm top-0 z-10">
        <h3 className="text-3xl">Dev.hike</h3>

        {/* MOBILE NAVIGATION */}
        <Sheet>
            <SheetTrigger className="sm:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent>
                <div className="my-5 flex flex-col justify-center gap-3">
                    <ModeToggle />
                    <SignedOut>
                        <Button onClick={() => navigate('/sign-in')} variant="outline">Sign In <LogIn size={18} className="mx-1" /></Button>
                        <Button onClick={() => navigate('/sign-up')} variant="outline">Sign up <User size={18} className="mx-1" /></Button>
                    </SignedOut>
                    <SignedIn>
                        <Button variant='outline' className="w-full"> {user?.fullName} <User size={18} className="mx-1" /></Button>
                        <Button variant='outline' className="w-full">Settings<Settings size={18} className="mx-1" /></Button>
                        <Button variant='outline' className="w-full">Log Out<LogOut size={18} className="mx-1" /></Button>
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