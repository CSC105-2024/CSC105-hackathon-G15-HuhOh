import React from 'react'
import LandingPage from './pages/Landing/LandingPage'
import SignUpPage from './pages/SignUp/SignUpPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import TranslationPage from './pages/Translation/TranslationPage'
import SignIn from './pages/SignIn/SignInPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <Loader2 className="animate-spin" size={18} />
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/translations',
    element: <TranslationPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
])

const App = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<LoadingFallback />}
      hydrationData={{}}
    />
  )
}

export default App
