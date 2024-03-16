import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Layout Imports
import RootLayout from './layouts/root-layout'

// View Imports
import SignInComponent from './views/SignIn'
import SignUpComponent from './views/SignUp'
import Dashboard from './views/Dashboard'
import DashboardLayout from './layouts/dashboard-layout.tsx'
import { GlobeDemo } from './views/Landing.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <GlobeDemo /> },
      { path: '/sign-in', element: <SignInComponent /> },
      { path: '/sign-up', element: <SignUpComponent /> },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}  />
  </React.StrictMode>,
)
