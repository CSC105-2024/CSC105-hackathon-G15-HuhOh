import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const LandingNavBar = () => {
  return (
    // TODO: fix navbar mobile
    <header className="flex flex-row justify-between items-center px-6 lg:px-12 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
      <a href="#" aria-label="Logo" className="flex items-center gap-3 group">
        <div className="relative">
          <img
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 transition-transform group-hover:scale-105"
            alt="HuhOh logo"
            src="/logo.svg"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </div>
        <span className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
          HuhOh <span className="text-gray-500 font-normal">(H O)</span>
        </span>
      </a>
      <nav>
        <ul>
          <li className="flex gap-3">
            <Link to="/signin">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="secondary"
                className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
              >
                Sign Up
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default LandingNavBar
