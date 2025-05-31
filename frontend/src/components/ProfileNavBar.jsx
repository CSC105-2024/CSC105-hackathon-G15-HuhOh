import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  const handleSignOut = () => {
    // Clear tokens or user data here if needed
    navigate('/signin')
  }

  return (
    <header className="flex justify-between items-center px-8 py-6 border-b border-border bg-surface">
      <a href="/" aria-label="Logo" className="flex items-center gap-4 group">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold text-xl">H O</span>
          </div>
        </div>
        <span className="font-semibold text-lg text-text group-hover:text-primary transition-colors">
          HuhOh <span className="text-gray-500 font-normal">(H O)</span>
        </span>
      </a>
      <div className="relative" ref={menuRef}>
        <button
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Profile"
        >
          <span className="text-2xl">👤</span>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setMenuOpen(false)
                navigate('/profile')
              }}
            >
              View Profile Page
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setMenuOpen(false)
                navigate('/profile/edit')
              }}
            >
              Edit Profile Page
            </button>
            <button
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default ProfileNavBar
