import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SigninNav from '@/components/SignIn/SignInNav'

// Zod validation schema for sign in
const signinSchema = z.object({
  email: z.string().email('wrong email address'),
  password: z.string().min(6, 'wrong password'),
})

const SignIn = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      console.log('Signing in with:', data)
      setTimeout(() => {
        setLoading(false)
        navigate('/dashboard') // Change this route as needed
      }, 1000)
    } catch (err) {
      setLoading(false)
      console.error('Sign in error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top navigation bar */}
      <SigninNav />

      {/* Centered sign-in form */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-6 space-x-6 border-b border-gray-200">
            <span className="text-purple-600 font-semibold pb-2 border-b-2 border-purple-600">
              Sign in
            </span>
            <Link
              to="/signup"
              className="text-gray-500 hover:text-purple-600 pb-2 border-b-2 border-transparent hover:border-purple-500 transition-all"
            >
              Sign up
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input type="email" placeholder="Email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Link to Sign Up */}
            <div className="text-sm text-center text-gray-500">
              New here?{' '}
              <Link to="/signup" className="text-purple-600 hover:underline">
                Create an account
              </Link>
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-40 bg-purple-600 hover:bg-purple-700 rounded-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>

            {/* Demo mode */}
            <div className="text-center text-sm text-gray-400">
              Or, try the demo mode
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
