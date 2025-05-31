import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
const SigninNav = () => {
  return (
    <header className="flex justify-between items-center px-6 lg:px-12 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
      <a href="#" aria-label="Logo" className="flex items-center gap-3 group">
        <div className="relative">
          <img
            src="/logo.svg"
            alt="HuhOh logo"
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
        </div>
        <span className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
          HuhOh <span className="text-gray-500 font-normal">(H O)</span>
        </span>
      </a>
      <Link to="/signup">
        <Button className="px-4 py-2 rounded-full text-white bg-purple-600 hover:bg-purple-700">
          Sign Up
        </Button>
      </Link>
    </header>
  )
}

export default SigninNav
