import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import UserProvider from '@/context/UserContext'
import { ClerkProvider } from '@clerk/clerk-react'
import { shadesOfPurple } from '@clerk/themes'
import { Outlet, useNavigate } from 'react-router-dom'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
 
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const RootLayout = () => {

    const navigate = useNavigate()

  return (
    <>
    <ThemeProvider defaultTheme='dark'>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} navigate={navigate} appearance={{
            baseTheme: shadesOfPurple,
            layout: {
                socialButtonsVariant: 'blockButton',
            },
            variables: {
                colorPrimary: 'white',
                colorTextOnPrimaryBackground: 'black',
            }
        }}>
            <UserProvider>
                <header className='header'>
                    <Navbar />
                </header>
                <main>
                    <Outlet />
                    <Toaster />
                </main>
            </UserProvider>
        </ClerkProvider>
    </ThemeProvider>
    </>
  )
}

export default RootLayout