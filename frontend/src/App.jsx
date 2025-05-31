import React from 'react'
import LandingPage from './pages/Landing/LandingPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import TranslationPage from './pages/Translation/TranslationPage'

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
  // {
  //   path: '/login',
  //   element: <LogInPage />,
  // },
  // {
  //   path: '/signup',
  //   element: <SignUpPage />,
  // },
  {
    path: '/translation',
    element: <TranslationPage />,
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
