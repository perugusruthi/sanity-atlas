import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {Search, Menu, X, BookOpen, FileText, Shield, Info} from 'lucide-react'

const SANITY_LOGO_URL =
  'https://cdn.sanity.io/files/0jy2qv9d/production/797b1bb17721f4e4bc1141bc93e4de9d5ae57746.png'

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Clear search when navigating away from search results
  useEffect(() => {
    if (!location.pathname.includes('/search')) {
      setSearchQuery('')
    }
  }, [location.pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="ml-4 md:ml-0 flex items-center">
              <img src={SANITY_LOGO_URL} alt="Sanity Logo" className="h-7 w-auto mr-6" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Support Atlas</h1>
                <p className="text-sm text-gray-500">Knowledge Hub</p>
              </div>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search
                  className={`h-5 w-5 transition-colors ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`}
                />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search articles, demos, pain points, personas, and more..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
              />
              {searchQuery && (
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Search
                </button>
              )}
            </form>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Home
            </a>
            <a
              href="/search"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/search'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Browse All
            </a>
          </nav>
        </div>
      </div>

      {/* Enhanced Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Home
            </a>
            <a
              href="/search"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === '/search'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Browse All
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
