import { Link, useLocation } from 'react-router-dom'

const DashboardNavBar = () => {
  const location = useLocation()
  const isActive = (path) => location.pathname.startsWith(path)

  const navItems = [
    {
      name: 'translation',
      icon: '/icons/translate.svg',
      link: '/translation',
    },
    {
      name: 'slangopedia',
      icon: '/icons/dictionary.svg',
      link: '/slangopedia',
    },
    {
      name: 'profile',
      icon: '/icons/profile.svg',
      link: '/profile',
    },
  ]

  return (
    <header className="sticky top-0 z-50 flex flex-row justify-between items-center px-6 lg:px-12 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
      <Link to="/" aria-label="Logo" className="flex items-center gap-3 group">
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
      </Link>
      <nav aria-label="Dashboard navigation">
        <ul className="flex flex-row gap-6">
          {navItems.map((navItem) => {
            const active = isActive(navItem.link)
            return (
              <li key={navItem.name}>
                <Link
                  to={navItem.link}
                  className={`group flex items-center justify-center p-2 rounded-lg transition-colors ${
                    active
                      ? 'bg-purple-100/80 text-purple-600'
                      : 'hover:bg-gray-100/50 text-gray-600'
                  }`}
                >
                  <img
                    src={navItem.icon}
                    alt={navItem.name}
                    className={`w-6 h-6 transition-all ${
                      active
                        ? 'opacity-100'
                        : 'opacity-70 group-hover:opacity-100'
                    }`}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default DashboardNavBar
