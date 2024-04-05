import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Layout Imports
import RootLayout from './layouts/root-layout'
import DashboardLayout from './layouts/dashboard-layout.tsx'
import ProtectRoute from './layouts/protect-route.tsx'

// View Imports
import SignInComponent from './views/SignIn'
import SignUpComponent from './views/SignUp'
import Dashboard from './views/Dashboard'
import Landing from './views/Landing.tsx'
import NewTimeLine from './views/NewTimeLine.tsx'
import NewEvent from './views/NewEvent.tsx'
import NewPost from './views/NewPost.tsx'
import Profile from './views/Profile.tsx'
import InitiateProfileFirst from './views/InitiateProfileFirst.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/sign-in', element: <SignInComponent /> },
      { path: '/sign-up', element: <SignUpComponent /> },
      { 
        element: <ProtectRoute />,
        children: [
          { path: '/profile', element: <Profile /> },     
          { path: '/new/timeline', element: <NewTimeLine /> },
          { path: '/new/event', element: <NewEvent /> },
          { path: '/new/post', element: <NewPost /> },
          { path: '/initiate-profile/1', element: <InitiateProfileFirst /> },
          {
            element: <DashboardLayout />,
            children: [
              {
                path: '/dashboard',
                element: <Dashboard />
              }
            ]
          }
        ]
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}  />
  </React.StrictMode>,
)
