import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SignupNav from '@/components/Signup/SignupNav'
import api from '@/services/api'
import { toast } from 'sonner'

const signupSchema = z
  .object({
    username: z.string().min(2, 'Username is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const SignUpPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await api.post(`/auth/signup`, {
        username: data.username,
        email: data.email,
        password: data.password,
      })

      if (res.data.success) {
        toast.success('Sign Up successful')
        setTimeout(() => {
          navigate('/signin')
        }, 750)
      } else {
        setTimeout(() => {
          toast.error(res.data?.msg || 'Signup failed')
        }, 750)
      }
    } catch (err) {
      setTimeout(() => {
        toast.error(err.response?.data?.msg || 'Server error')
      }, 750)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top navigation bar */}
      <SignupNav />

      {/* Centered form section */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-6 space-x-6 border-b border-gray-200">
            <Link
              to="/signin"
              className="text-gray-500 hover:text-purple-600 pb-2 border-b-2 border-transparent hover:border-purple-500 transition-all"
            >
              Sign in
            </Link>
            <span className="text-purple-600 font-semibold pb-2 border-b-2 border-purple-600">
              Sign up
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

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

            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Link to Sign In */}
            <div className="text-sm text-center text-gray-500">
              Already have an account?{' '}
              <Link to="/signin" className="text-purple-600 hover:underline">
                Sign In
              </Link>
            </div>

            {/* Submit button centered and styled */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-40 bg-purple-600 hover:bg-purple-700 rounded-full"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Sign Up'}
              </Button>
            </div>

            {/* Demo mode link */}
            <p className="text-sm text-center text-gray-400">
              Or, try the demo mode
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
